from flask import Flask
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()
database_url = os.getenv('DATABASE_URL')

@app.route("/", methods=["GET"])
def getData() :
    print(database_url)
    return "hello"