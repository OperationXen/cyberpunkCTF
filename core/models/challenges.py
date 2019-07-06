from django.db import models
from django.db.models import ForeignKey, ManyToManyField, FileField
from django.db.models.fields import *
from django.utils import timezone

from .users import CTFUser
from .misc import Tag


class BaseChallenge(models.Model):
    """ A basic challenge """
    title = CharField(max_length=256, help_text="Challenge title")
    tags = ManyToManyField("Tag", related_name="challenges", help_text="Descriptive tags associated with the challenge")
    content = TextField(blank=False, help_text="Text of the challenge")
    image = FilePathField(default=None, null=True, help_text="[Optional] Image file to display")

    # A challenge can require other challenges to be solved first
    prerequisites = ManyToManyField("BaseChallenge", related_name="challenges", help_text="Any prerequisites for the challenge")
    unlock_delay = DateTimeField(null=True, default=None, help_text="Automatically unlock challenge after this time")
    hidden = BooleanField(default=False, help_text="If True, challenge will be invisible until unlocked instead of greyed out")

    # points and associated control variables
    value_start = IntegerField(null=True, help_text="Starting value of the flag")
    value_soft_floor = IntegerField(null=True, help_text="Value at which the flag stops decaying due to solve count")
    value_hard_floor = IntegerField(null=True, help_text="The absolute minimum the flag can be worth, even with hints")
    number_solves_to_minimum = IntegerField(default=0, help_text="Number of successful solves before value reaches minimum")


class Solve(models.Model):
    """ Record of each individual solve or solve attempt """
    datetime = DateTimeField(default=timezone.now, help_text="Date and Time the answer was submitted")
    correct = BooleanField(blank=False, help_text="If the submission was correct or not")
    value = IntegerField(null=True, help_text="Points awarded for solving the challenge")
    first = BooleanField(default=False, help_text="True if this is the first solve for this challenge")

    user = ForeignKey("CTFUser", related_name="solvers", on_delete=models.CASCADE, help_text="User who submitted the solve attempt")
    challenge = ForeignKey("BaseChallenge", related_name="solve", on_delete=models.CASCADE, help_text="Challenge for which this solve was submitted")
    flag = ForeignKey("BaseFlag", related_name="solve", on_delete=models.CASCADE, help_text="Submitted flag")
