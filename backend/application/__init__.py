from flask import Flask
from flask_bcrypt import Bcrypt
from application.db_connection import create_db_connection
from application.routes.user_routes import user_routes

app = Flask(__name__)

bcrypt = Bcrypt(app)
db = create_db_connection(app)

app.register_blueprint(user_routes)


