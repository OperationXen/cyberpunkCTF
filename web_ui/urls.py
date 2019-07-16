from django.urls import path, re_path, include
from web_ui.views import MainView


urlpatterns = [
    # Matches everything, has to go last (will also make it rain false positives if you scan the site)
    re_path(".*", MainView.as_view()),
]
