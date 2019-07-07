from django.shortcuts import render
from django.views.generic import View


class MainView(View):
    """ View for the standard web base UI SPA """

    def get(self, request):
        return render(request, "web_ui/mainpage.html")
