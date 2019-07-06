from django.db import models
from django.db.models import FileField, ForeignKey
from django.db.models.fields import *


# Flags and related models
class BaseFlag(models.Model):
    """ A basic flag type """
    challenge = ForeignKey("BaseChallenge", on_delete=models.CASCADE, help_text="The challenge this flag is for")

    title = CharField(max_length=256, blank=True, help_text="[Optional] a title for the flag itself")
    guide = CharField(max_length=256, blank=False, default="flag{cyberpunkCTF}", help_text="Flag formatting guide")
    value = CharField(max_length=1024, blank=True, help_text="The value to check for")
    exact = BooleanField(default=False, help_text="Set true for exact matching, otherwise flag is awarded if value appears anywhere")
    regex = BooleanField(default=False, help_text="True if flag is checked with a regex")
    attempts = IntegerField(default=0)


class FileFlag(BaseFlag):
    """ A more advanced flag which allows for file submission """
    file = FileField()
    check_function = CharField(max_length=255, help_text="Name of function that will be called to check the file")
