from mongoengine import (
    Document,
    StringField,
    IntField,
    DecimalField,
    BooleanField,
    ReferenceField,
    ListField,
    EmbeddedDocument,
    EmbeddedDocumentField,
    DynamicField,
    DateTimeField,
    DateField,

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
    wallet_balance = DecimalField()
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
    duration = StringField(required=True)

    def to_dict(self):
        return {
            "movie_name": self.movie_name,
            "language": self.language,
            "image_url": self.image_url,
            "shows": [str(show.id) for show in self.shows],
            "duration": self.duration,
        }


class Event(Document):
    event_name = StringField(required=True)
    language = ListField(required=True)
    image_url = StringField()
    shows = ListField(ReferenceField("Event_Show"))
    duration = StringField(required=True)

    def to_dict(self):
        return {
            "event_name": self.event_name,
            "language": self.language,
            "image_url": self.image_url,
            "shows": [str(show.id) for show in self.shows],
            "duration": self.duration,
        }


class Movie_Show(Document):
    movie_id = ReferenceField("Movie", required=True)
    date = StringField(required=True)
    language = StringField(required=True)
    start_time = StringField(required=True)
    end_time = StringField(required=True)
    price = DecimalField(required=True)
    total_seats = IntField(default=100)
    booked_seats = IntField(default=0)
    seat_map = ListField(ListField(DynamicField(default=0)))


class Event_Show(Document):
    date = StringField(required=True)
    start_time = StringField(required=True)
    end_time = StringField(required=True)
    language = StringField()
    event_id = ReferenceField("Event", required=True)
    price = DecimalField(required=True)
    total_seats = IntField(required=True)
    booked_seats = IntField()
    seat_map = ListField(ListField(DynamicField(default=0)))
