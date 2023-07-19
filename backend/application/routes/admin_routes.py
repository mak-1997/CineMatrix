from flask import Blueprint, jsonify, request
from application.models import Admin
import jwt


admin_routes = Blueprint("admin_routes", __name__)


@admin_routes.route("/admin/signup", methods=["POST"])
def admin_signup():
    new_admin = request.get_json()

    # Check if the admin_email already exists
    existing_admin = Admin.objects(admin_email=new_admin["admin_email"]).first()
    if existing_admin:
        return jsonify({"message": "admin_Email already exists"}), 400

    # Import bcrypt here to avoid circular import error
    from application import bcrypt

    # Encrypt the password using bcrypt
    hashed_password = bcrypt.generate_password_hash(new_admin["admin_password"]).decode(
        "utf-8"
    )

    # Create a new admin
    admin = Admin(
        admin_email=new_admin["admin_email"],
        admin_password=hashed_password,
        admin_name=new_admin["admin_name"],
        is_admin=True,
    )
    admin.save()

    return jsonify({"message": "Signup successful"}), 201

@admin_routes.route("/admin/login", methods=["POST"])
def admin_login():
    login_data = request.get_json()

    # Find the admin with the provided email
    admin = Admin.objects(admin_email=login_data["admin_email"], is_admin = True).first()
    if not admin:
        return jsonify({"message": "Wrong Credentials"}), 400

    # Import bcrypt here to avoid circular import error
    from application import bcrypt

    # Check if the password is correct
    if bcrypt.check_password_hash(admin.admin_password, login_data["admin_password"]):
        # Generate a token using jsonwebtoken
        token = jwt.encode(
            {"_id": str(admin.id)}, "my signature", algorithm="HS256"
        )

        return jsonify({"message": "Login successful", "token": token}), 200
    else:
        return jsonify({"message": "Wrong password"}), 400
