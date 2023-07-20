from flask import Blueprint, jsonify, request, Response, g
from application.models import Event_Show, Event , User # Import the necessary models
from application.middlewares.admin_auth_middleware import admin_auth_middleware
from application.middlewares.user_auth_middleware import user_auth_middleware
from application.utilities.helper_functions import calculate_end_time
from decimal import Decimal
import json

event_show_routes = Blueprint("event_show_routes", __name__)


# get all the shows -
@event_show_routes.route("/event_shows", methods=["GET"])
def get_all_shows():
    event_shows = Event_Show.objects()
    updated_event_shows = []

    for event_show in event_shows:
        # Fetch the corresponding Event object using the event_id attribute of event_show
        event = Event.objects.with_id(event_show.event_id.id)

        if event:
            # Calculate the end time using the helper function
            end_time = calculate_end_time(event_show.start_time, event.duration)

            # Create a new dictionary and copy the fields from event_show and event
            updated_event_show = {
                **event_show.to_mongo(),
                "image_url": event.image_url,
                "duration": event.duration,
                "event_name": event.event_name,
                "end_time": end_time,
                "event_id": str(event.id),  # Convert the ObjectId to a string
            }
            updated_event_shows.append(updated_event_show)

    # Convert the ObjectId to a string for each item in the list
    for show in updated_event_shows:
        show["_id"] = str(show["_id"])

    # Return the Response object with a valid JSON response
    return Response(response=json.dumps(updated_event_shows), status=200, mimetype="application/json")



# get all the shows related to a particular event -
@event_show_routes.route("/event_shows/<ObjectId:_id>", methods=["GET"])
def get_related_shows(_id):
    # Fetch the Event_Show objects related to the specified Event _id
    event_shows = Event_Show.objects(event_id=_id)
    print(event_shows)
    # Fetch the corresponding Event object
    event = Event.objects.with_id(_id)  # Use with_id() to fetch the event with the given ObjectId

    if not event:
        return jsonify({"message": "Event not found"}), 404

    # Create a list to store updated Event_Show objects with additional fields
    updated_event_shows = []

    # Update each Event_Show object with image_url and duration from the Event object
    for event_show in event_shows:
        # Calculate the end time using the helper function
        end_time = calculate_end_time(event_show.start_time, event.duration)

        # Create a new dictionary and copy the fields from event_show and event
        updated_event_show = {
            **event_show.to_mongo(),
            "image_url": event.image_url,
            "duration": event.duration,
            "event_name": event.event_name,
            "end_time": end_time,
            "event_id": str(event.id),  # Convert the ObjectId to a string
        }
        updated_event_shows.append(updated_event_show)

    # Convert the ObjectId to a string for each item in the list
    for show in updated_event_shows:
        show["_id"] = str(show["_id"])

    return jsonify(updated_event_shows)



# create a new show
@event_show_routes.route("/event_show/create", methods=["POST"])
@admin_auth_middleware
def create_event_show():
    new_event_show = request.get_json()
    event = Event.objects(id=new_event_show["event_id"]).first()
    
    # Calculate the end time using the helper function
    end_time = calculate_end_time(new_event_show["start_time"], event.duration)
    
    # Create the Event_Show object and set the end_time field
    event_show = Event_Show(
        event_id=new_event_show["event_id"],
        date=new_event_show["date"],
        language=new_event_show["language"],
        price=new_event_show["price"],
        start_time=new_event_show["start_time"],
        end_time=end_time,  # Set the calculated end time
        total_seats=new_event_show.get("total_seats", 100),
        booked_seats=new_event_show.get("booked_seats", 0),
        seat_map=new_event_show.get("seat_map", [[0] * 10 for _ in range(10)])  # Default 10x10 seat_map
    )
    
    event_show.save()

    event.shows.append(event_show.id)
    event.save()
    return event_show.to_json(), 201


# Book a show
@event_show_routes.route("/book_event_show/<ObjectId:_id>", methods=["PUT"])
@user_auth_middleware
def book_event_show(_id):
    user_id = g.user_id
    booked_show_data = request.get_json()
    
    # Find the existing Event_Show object by _id
    event_show = Event_Show.objects.with_id(_id)
    # return event_show.to_json()

    if not event_show:
        return jsonify({"message": "Event_Show not found"}), 404
    
    def count_non_zero_values(arr):
        count = 0
        for row in arr:
            for value in row:
                if value != 0:
                    count += 1
        return count

    # Update the fields of the existing Event_Show object with the new data
    for key, value in booked_show_data.items():
        if key == "event_id" or key == "_id" :
            continue
        elif key == "seat_map" :
            setattr(event_show, key, value)
            count = count_non_zero_values(value)
            setattr(event_show, "booked_seats", count)
        else :
            setattr(event_show, key, value)

    event_show.save()

    user = User.objects.with_id(user_id)
    user.event_show_bookings.append(_id)
     # Convert the event_show price to Decimal
    event_show_price = Decimal(str(event_show.price))

    user.wallet_balance = user.wallet_balance - event_show_price
    user.save()

    return event_show.to_json()

