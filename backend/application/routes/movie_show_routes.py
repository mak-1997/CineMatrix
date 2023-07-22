from flask import Blueprint, jsonify, request, Response,g
from application.models import Movie_Show, Movie , User # Import the necessary models
from application.middlewares.admin_auth_middleware import admin_auth_middleware
from application.middlewares.user_auth_middleware import user_auth_middleware
from application.utilities.helper_functions import calculate_end_time
from decimal import Decimal
import json


movie_show_routes = Blueprint("movie_show_routes", __name__)


# get all the shows -
@movie_show_routes.route("/movie_shows", methods=["GET"])
def get_all_shows():
    movie_shows = Movie_Show.objects()
    updated_movie_shows = []

    for movie_show in movie_shows:
        # Fetch the corresponding Movie object using the movie_id attribute of movie_show
        movie = Movie.objects.with_id(movie_show.movie_id.id)

        if movie:
            # Calculate the end time using the helper function
            end_time = calculate_end_time(movie_show.start_time, movie.duration)

            # Create a new dictionary and copy the fields from movie_show and movie
            updated_movie_show = {
                **movie_show.to_mongo(),
                "image_url": movie.image_url,
                "duration": movie.duration,
                "movie_name": movie.movie_name,
                "end_time": end_time,
                "movie_id": str(movie.id),  # Convert the ObjectId to a string
            }
            updated_movie_shows.append(updated_movie_show)

    # Convert the ObjectId to a string for each item in the list
    for show in updated_movie_shows:
        show["_id"] = str(show["_id"])

    # Return the Response object with a valid JSON response
    return Response(response=json.dumps(updated_movie_shows), status=200, mimetype="application/json")


# get all the shows related to a particular movie -
@movie_show_routes.route("/movie_shows/<ObjectId:_id>", methods=["GET"])
def get_related_shows(_id):
    # Fetch the Movie_Show objects related to the specified Movie _id
    movie_shows = Movie_Show.objects(movie_id=_id)
    print(movie_shows)
    # Fetch the corresponding Movie object
    movie = Movie.objects.with_id(_id)  # Use with_id() to fetch the movie with the given ObjectId

    if not movie:
        return jsonify({"message": "Movie not found"}), 404

    # Create a list to store updated Movie_Show objects with additional fields
    updated_movie_shows = []

    # Update each Movie_Show object with image_url and duration from the Movie object
    for movie_show in movie_shows:
        # Calculate the end time using the helper function
        end_time = calculate_end_time(movie_show.start_time, movie.duration)

        # Create a new dictionary and copy the fields from movie_show and movie
        updated_movie_show = {
            **movie_show.to_mongo(),
            "image_url": movie.image_url,
            "duration": movie.duration,
            "movie_name": movie.movie_name,
            "end_time": end_time,
            "movie_id": str(movie.id),  # Convert the ObjectId to a string
        }
        updated_movie_shows.append(updated_movie_show)

    # Convert the ObjectId to a string for each item in the list
    for show in updated_movie_shows:
        show["_id"] = str(show["_id"])

    return jsonify(updated_movie_shows)


# create a new show
@movie_show_routes.route("/movie_show/create", methods=["POST"])
@admin_auth_middleware
def create_movie_show():
    new_movie_show = request.get_json()
    movie = Movie.objects(id=new_movie_show["movie_id"]).first()

    # Calculate the end time using the helper function
    end_time = calculate_end_time(new_movie_show["start_time"], movie.duration)

    # Create the Movie_Show object and set the end_time field
    movie_show = Movie_Show(
        movie_id=new_movie_show["movie_id"],
        date=new_movie_show["date"],
        language=new_movie_show["language"],
        price=new_movie_show["price"],
        start_time=new_movie_show["start_time"],
        end_time=end_time,  # Set the calculated end time
        total_seats=new_movie_show.get("total_seats", 100),
        booked_seats=new_movie_show.get("booked_seats", 0),
        seat_map=new_movie_show.get(
            "seat_map", [[0] * 10 for _ in range(10)]
        ),  # Default 10x10 seat_map
    )

    movie_show.save()

    movie.shows.append(movie_show.id)
    movie.save()
    return movie_show.to_json(), 201


# Book a show
@movie_show_routes.route("/book_movie_show/<ObjectId:_id>", methods=["PUT"])
@user_auth_middleware
def book_movie_show(_id):
    user_id = g.user_id
    booked_show_data = request.get_json()
    
    # Find the existing Movie_Show object by _id
    movie_show = Movie_Show.objects.with_id(_id)
    # return movie_show.to_json()

    if not movie_show:
        return jsonify({"message": "Movie_Show not found"}), 404

    def count_non_zero_values(arr):
        count = 0
        for row in arr:
            for value in row:
                if value != 0:
                    count += 1
        return count
    # Update the fields of the existing Movie_Show object with the new data
    for key, value in booked_show_data.items():
        if key == "movie_id" or key == "_id" :
            continue
        elif key == "seat_map" :
            setattr(movie_show, key, value)
            count = count_non_zero_values(value)
            setattr(movie_show, "booked_seats", count)
        else :
            setattr(movie_show, key, value)

    movie_show.save()

    user = User.objects.with_id(user_id)
    user.movie_show_bookings.append(_id)
     # Convert the movie_show price to Decimal
    movie_show_price = Decimal(str(movie_show.price))

    user.wallet_balance = user.wallet_balance - movie_show_price
    user.save()

    return movie_show.to_json()

