from django.db import models
from django.db.models import ImageField, ForeignKey, FileField, ManyToManyField
from django.db.models.fields import *


class Hint(models.Model):
    """ A hint for a challenge """
    challenge = ForeignKey("BaseChallenge", null=False, related_name="hints", on_delete=models.CASCADE, help_text="The challenge this hint is for")
    upfront_cost = IntegerField(default=0, help_text="A user or team must give up this many points immediately to unlock the challenge")
    deferred_cost = IntegerField(default=0, help_text="Taking this hint will reduce the challenge value by this value")
    prerequisites = ManyToManyField("BaseChallenge")

    title = CharField(max_length=255, blank=True, help_text="[Optional] Title of hint")
    image = ImageField(null=True, help_text="[Optional] Image for hint")
    file = FileField(null=True, help_text="[Optional] Files associated with hint")
    content = TextField(blank=True, help_text="Hint text")