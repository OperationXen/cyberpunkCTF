from django.db import models
from django.db.models import ForeignKey, ManyToManyField, FileField
from django.db.models.fields import *


class Category(models.Model):
    """ Thematic grouping of challenges under a single heading """
    title = CharField(max_length=256, blank=False, help_text="Name of category")
    order = IntegerField(null=True, blank=True, help_text="Ordering override")

    def __str__(self):
        return self.title

class Tag(models.Model):
    """ Tags allow challenges to be grouped """
    name = CharField(max_length=32, blank=False)


class File(models.Model):
    """ Files for challenges """
    challenge = ForeignKey("BaseChallenge", related_name="files", on_delete=models.CASCADE, help_text="Challenge to which this file relates")
    title = CharField(max_length=256, blank=True, help_text="File title")
    description = CharField(max_length=256, blank=True, help_text="[Optional] A brief description of the file")
    filepath = FileField(help_text="Reference to the file")
