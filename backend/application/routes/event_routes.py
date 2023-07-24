from flask import Blueprint, jsonify, request
from application.models import Admin
from application.models import Event
from application.middlewares.admin_auth_middleware import admin_auth_middleware
import jwt

event_routes = Blueprint("event_routes", __name__ )


@event_routes.route("/events/get", methods=["GET"])
def get_all_movies():
    all_events = Event.objects()
    return all_events.to_json(), 200


@event_routes.route("/event/add", methods=["POST"])
@admin_auth_middleware
def add_event () :
    new_event = request.get_json()
    movie = Event(**new_event)
    movie.save()
    return movie.to_json(), 201