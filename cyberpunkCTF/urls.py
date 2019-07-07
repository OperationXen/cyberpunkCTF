from django.contrib import admin
from django.urls import path, re_path, include
from django.views.decorators.csrf import csrf_exempt

from core.views import PrivateGraphQLView
from core.schema.schema import ctfschema


urlpatterns = [
    re_path("graphql/", csrf_exempt(PrivateGraphQLView.as_view(graphiql=True, schema=ctfschema))),
    re_path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    re_path('^/?$', include('web_ui.urls')),
]
