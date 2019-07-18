from django.contrib import admin
from django.urls import path, re_path, include
from django.views.decorators.csrf import csrf_exempt

from core.views import PrivateGraphQLView, AuthCheckView, AuthLoginView, AuthLogOutView
from core.schema.schema import ctfschema


urlpatterns = [
    re_path("graphql/", csrf_exempt(PrivateGraphQLView.as_view(graphiql=True, schema=ctfschema))),

    re_path("authcheck", AuthCheckView.as_view()),
    re_path("login/?", csrf_exempt(AuthLoginView.as_view())),
    re_path("logout/?", csrf_exempt(AuthLogOutView.as_view())),
    path('accounts/', include('django.contrib.auth.urls')),
    re_path('admin/', admin.site.urls),
    path('', include('web_ui.urls')),
]
