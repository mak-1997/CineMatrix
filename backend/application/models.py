from mongoengine import (
    Document,
    StringField,
    IntField,
    BooleanField,
    ReferenceField,
    ListField,
    EmbeddedDocument,
    EmbeddedDocumentField,
    DynamicField,
    DateTimeField,
    DateField
)

class Admin(Document):
    admin_name = StringField(required=True)
    admin_email = StringField(required=True)
    admin_password = StringField(required=True)
    is_admin = BooleanField(default=True)


class User(Document):
    user_name = StringField(required=True)
    user_email = StringField(required=True)
    user_password = StringField(required=True)
    wallet_balance = IntField()
    bio = StringField()
    membership_type = StringField(required=True)
    gender = StringField(required=True)
    user_status = StringField(required=True)
    dob = StringField(required=True)
    movie_show_bookings = ListField(ReferenceField("Movie"))
    event_show_bookings = ListField(ReferenceField("Event"))


class Movie(Document):
    movie_name = StringField(required=True)
    language = ListField(required=True)
    image_url = StringField()
    shows = ListField(ReferenceField("Movie_Show"))
    length = IntField(required=True)

class Event(Document):
    event_name = StringField(required=True)
    language = ListField(required=True)
    image_url = StringField()
    shows = ListField(ReferenceField("Event_Show"))
    length = IntField(required=True)


class Movie_Show(Document):
    date = StringField(required=True)
    start_time = IntField(required=True)
    end_time = IntField(required=True)
    language = StringField()
    movie_id = ReferenceField("Movie",required=True)
    price = IntField(required=True)
    total_seats = IntField(required=True)
    booked_seats = IntField()
    seat_map = ListField(ListField(DynamicField(default=0)))


class Event_Show(Document):
    date = StringField(required=True)
    start_time = IntField(required=True)
    end_time = IntField(required=True)
    language = StringField()
    event_id = ReferenceField("Event",required=True)
    price = IntField(required=True)
    total_seats = IntField(required=True)
    booked_seats = IntField()
    seat_map = ListField(ListField(DynamicField(default=0)))