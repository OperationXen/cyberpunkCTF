from django.utils import timezone
from django.db import models
from django.db.models.fields import *


class Announcement(models.Model):
    """ A basic announcement """
    datetime = DateTimeField(default=timezone.now, help_text="Time of notification sending")
    title = CharField(max_length=255, blank=True, help_text="[Optional] Notification title")
    content = TextField(help_text="Body of the notification")