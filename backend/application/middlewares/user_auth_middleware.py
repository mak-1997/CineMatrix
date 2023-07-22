from flask import request, jsonify, g
from application.models import User

import jwt

def user_auth_middleware(func):
    def decorate_function(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({"message": "Token is missing"}), 401

        try:
            # Verify the token and extract the user_id
            decoded_token = jwt.decode(token, 'my signature', algorithms=['HS256'])
            user_id = decoded_token.get('_id')
            # Find the user with the provided user_id
            user = User.objects(id=user_id).first()
            if not user:
                return jsonify({"message": "Unauthorized"}), 401
            
            g.user_id = user_id  
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

        return func(*args, **kwargs)

    return decorate_function
