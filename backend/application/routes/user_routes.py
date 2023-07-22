from flask import Blueprint, request, jsonify
from application.models import User
import jwt

user_routes = Blueprint("user_routes", __name__)


@user_routes.route("/", methods=["GET"])
def get_all_users():
    try:
        all_users = User.objects().to_json()
        print("Database connection is active", all_users)
        return all_users
    except Exception as e:
        print("Database connection is not active",e)
        return "Error: Database connection is not active"
    

@user_routes.route("/user/signup", methods=["POST"])
def user_signup():
    if request.method != "POST" :
        return jsonify({"error message" : "Wrong method for this request"})
    
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
        wallet_balance = 1500,
        bio = new_user["bio"],
        membership_type = new_user["membership_type"],
        gender = new_user["gender"],
        user_status = 'active',
        dob = new_user["dob"],
        movie_show_bookings = [],
        event_show_bookings = []
    )
    user.save()

    return jsonify({"message": "Signup successful"}), 201


@user_routes.route("/user/login", methods=["POST"])
def user_login() :
    login_data = request.get_json()

    user = User.objects(user_email = login_data["user_email"]).first()
    if not user :
        return jsonify({"message" : "Wrong Email"}), 400
    
    from application import bcrypt

    if bcrypt.check_password_hash(user.user_password, login_data["user_password"]):
        token = jwt.encode({"_id" : str(user.id)}, "my signature", algorithm="HS256")
        return jsonify({"message" : "Login successful", "token" : token, "username" : user.user_name}), 200
    else :
        return jsonify({"message" : "Wrong password !!"}), 400