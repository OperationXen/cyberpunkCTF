from django.urls import path, re_path, include
from web_ui.views import MainView


urlpatterns = [
    re_path("^/?$", MainView.as_view()),
]
