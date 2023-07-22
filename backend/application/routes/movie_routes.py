from flask import Blueprint, jsonify, request
from application.models import Admin
from application.models import Movie
from application.middlewares.admin_auth_middleware import admin_auth_middleware
import jwt

movie_routes = Blueprint("movie_routes", __name__)


@movie_routes.route("/movies/get", methods=["GET"])
def get_all_movies():
    all_movies = Movie.objects()
    return all_movies.to_json(), 200


@movie_routes.route("/movie/add", methods=["POST"])
@admin_auth_middleware
def add_movie():
    new_movie = request.get_json()
    movie = Movie(**new_movie)
    movie.save()
    return movie.to_json(), 201
