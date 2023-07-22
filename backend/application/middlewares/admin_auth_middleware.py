from flask import request, jsonify, g
from application.models import Admin

import jwt

def admin_auth_middleware(func):
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({"message": "Token is missing"}), 401

        try:
            # Verify the token and extract the admin_id
            decoded_token = jwt.decode(token, 'my signature', algorithms=['HS256'])
            admin_id = decoded_token.get('_id')
            # Find the admin with the provided admin_id
            admin = Admin.objects(id=admin_id, is_admin=True).first()
            if not admin:
                return jsonify({"message": "Unauthorized"}), 401
            
            # g.admin_id = admin_id  
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

        return func(*args, **kwargs)

    return decorated_function
