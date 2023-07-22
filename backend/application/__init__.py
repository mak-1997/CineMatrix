from flask import Flask
from flask_bcrypt import Bcrypt
from application.db_connection import create_db_connection
from application.routes.user_routes import user_routes
from application.routes.admin_routes import admin_routes
from application.routes.movie_routes import movie_routes
from application.routes.event_routes import event_routes
from application.routes.movie_show_routes import movie_show_routes
from application.routes.event_show_routes import event_show_routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
db = create_db_connection(app)

app.register_blueprint(user_routes)
app.register_blueprint(admin_routes)
app.register_blueprint(movie_routes)
app.register_blueprint(event_routes)
app.register_blueprint(movie_show_routes)
app.register_blueprint(event_show_routes)


