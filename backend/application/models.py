from mongoengine import (
    Document,
    StringField,
    IntField,
    BooleanField,
    ReferenceField,
    ListField,
)

class User(Document):
    user_name = StringField(required=True)
    user_email = StringField(required=True)
    user_password = StringField(required=True)
