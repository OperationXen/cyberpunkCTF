from django.db import models
from django.db.models import ImageField, ForeignKey, FileField, ManyToManyField
from django.db.models.fields import *


class Hint(models.Model):
    """ A hint for a challenge """
    challenge = ForeignKey("BaseChallenge", null=False, related_name="hints", on_delete=models.CASCADE, help_text="The challenge this hint is for")
    upfront_cost = IntegerField(default=0, null=True, blank=True,  help_text="A user or team must give up this many points immediately to unlock the hint")
    deferred_cost = IntegerField(default=0, null=True, blank=True, help_text="Taking this hint will reduce the challenge value by this value")
    prerequisites = ManyToManyField("BaseChallenge", null=True, blank=True, help_text="Challenges needed to unlock this hint")

    title = CharField(max_length=255, blank=True, help_text="[Optional] Title of hint")
    image = ImageField(null=True, blank=True, help_text="[Optional] Image for hint")
    file = FileField(null=True, blank=True, help_text="[Optional] Files associated with hint")
    content = TextField(blank=True, help_text="Hint text")

    def __str__(self):
        return f"{self.challenge} - {self.title}"