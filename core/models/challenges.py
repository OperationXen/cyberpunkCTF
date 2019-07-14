from django.db import models
from django.db.models import ForeignKey, ManyToManyField, ImageField
from django.db.models.fields import *
from django.utils import timezone

from .users import CTFUser
from .misc import Tag


class BaseChallenge(models.Model):
    """ A basic challenge """
    title = CharField(max_length=256, blank=False, help_text="Challenge title")
    tags = ManyToManyField("Tag", blank=True, related_name="challenges", help_text="Descriptive tags associated with the challenge")
    category = ForeignKey("Category", null=True, blank=True, related_name="challenges", on_delete=models.PROTECT, help_text="Category for the challenge")
    content = TextField(blank=False, help_text="Text of the challenge")
    image = ImageField(null=True, blank=True, help_text="[Optional] Image file to display")
    slug = CharField(max_length=128, blank=True, help_text="[Optional] A brief synopsis of the challenge")

    # A challenge can require other challenges to be solved first
    prerequisites = ManyToManyField("BaseChallenge", blank=True, related_name="challenges", help_text="Any prerequisites for the challenge")
    unlock_delay = DateTimeField(null=True, blank=True, default=None, help_text="Automatically unlock challenge after this time")
    hidden = BooleanField(default=False, help_text="If True, challenge will be invisible until unlocked instead of greyed out")

    # points and associated control variables
    value_start = IntegerField(null=True, blank=True, help_text="Starting value of the flag")
    value_soft_floor = IntegerField(null=True, blank=True, help_text="Value at which the flag stops decaying due to solve count")
    value_hard_floor = IntegerField(null=True, blank=True, help_text="The absolute minimum the flag can be worth, even with hints")
    number_solves_to_minimum = IntegerField(null=True, blank=True, help_text="Number of successful solves before value reaches minimum")

    def __str__(self):
        return self.title


class Solve(models.Model):
    """ Record of each individual solve or solve attempt """
    datetime = DateTimeField(default=timezone.now, help_text="Date and Time the answer was submitted")
    correct = BooleanField(blank=False, help_text="If the submission was correct or not")
    value = IntegerField(null=True, help_text="Points awarded for solving the challenge")
    first = BooleanField(default=False, help_text="True if this is the first solve for this challenge")

    user = ForeignKey("CTFUser", related_name="solvers", on_delete=models.CASCADE, help_text="User who submitted the solve attempt")
    challenge = ForeignKey("BaseChallenge", related_name="solve", on_delete=models.CASCADE, help_text="Challenge for which this solve was submitted")
    flag = ForeignKey("BaseFlag", related_name="solve", on_delete=models.CASCADE, help_text="Submitted flag")
