from flask import Blueprint, request, jsonify
from application.models import User

user_routes = Blueprint("user_routes", __name__)


@user_routes.route("/", methods=["GET"])
def getData():
    try:
        all_users = User.objects().to_json()
        print("Database connection is active", all_users)
        return all_users
    except Exception as e:
        print("Database connection is not active",e)
        return "Error: Database connection is not active"
    

@user_routes.route("/user/signup", methods=["POST"])
def user_signup():
    new_user = request.get_json()

    # Check if the user_email already exists
    existing_user = User.objects(user_email=new_user["user_email"]).first()
    if existing_user:
        return jsonify({"message": "user_Email already exists"}), 400

    # Import bcrypt here to avoid circular import error
    from application import bcrypt
    # Encrypt the password using bcrypt
    hashed_password = bcrypt.generate_password_hash(new_user["user_password"]).decode(
        "utf-8"
    )

    # Create a new user
    user = User(
        user_email=new_user["user_email"],
        user_password=hashed_password,
        user_name=new_user["user_name"],
    )
    user.save()

    return jsonify({"message": "Signup successful"}), 201
