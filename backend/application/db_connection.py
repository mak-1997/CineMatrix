from flask_pymongo import PyMongo
from mongoengine import connect
from dotenv import load_dotenv
import os

def create_db_connection(app):
    load_dotenv()
    database_url = os.getenv('DATABASE_URL')

    # Set the MONGO_URI configuration
    app.config["MONGO_URI"] = database_url

    # Initialize Flask-PyMongo
    mongo = PyMongo(app)
    db = mongo.db

    try:
        # Attempt to connect to the database
        connection = connect("all_data", host=database_url)
        print("Connected to the database", connection)
        return db
    except Exception as e:
        print("Error connecting to the database:", e)
        return None
