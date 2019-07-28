from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models.users import CTFUser


class SignUpForm(UserCreationForm):

    class Meta(UserCreationForm):
        model = CTFUser
        fields = ('username', 'email')
