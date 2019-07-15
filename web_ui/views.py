from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
from json import dumps

from core.models.users import CTFUser


class MainView(View):
    """ View for the standard web base UI SPA """

    def get(self, request):
        return render(request, "web_ui/mainpage.html")
