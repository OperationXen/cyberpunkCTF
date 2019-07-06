from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import ForeignKey, ManyToManyField
from django.db.models.fields import *


class CTFUser(AbstractUser):
    """ Customisable user model """
    team = ForeignKey("Team", related_name="members", null=True, on_delete=models.SET_NULL, help_text="Team to which the user belongs")
    website = URLField(null=True, blank=True, help_text="User controlled web page")
    bio = TextField(max_length=128, blank=True, help_text="User tagline")
    location = CharField(max_length=8, blank=True, default="", help_text="User location")


class Team(models.Model):
    """ A collection of users working together """
    name = CharField(max_length=256)
    password = CharField(max_length=32)
    hints_unlocked = ManyToManyField("Hint", help_text="All hints unlocked for this team")
    captain = ForeignKey(CTFUser, on_delete=models.PROTECT, related_name="team_captain", help_text="The user who leads this team")

    bio = TextField(max_length=256, blank=True, help_text="Team blurb")
    website = URLField(null=True, blank=True, help_text="Team website")
    location = CharField(max_length=8, blank=True, default="", help_text="Team nationality")
