from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login
from graphene_django.views import GraphQLView
from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
from json import dumps

from core.models.users import CTFUser


#class PrivateGraphQLView(LoginRequiredMixin, GraphQLView):
class PrivateGraphQLView(GraphQLView):
    """ Custom graphql view - login required to view """
    pass


class AuthCheckView(View):
    """ View checks the current state of the user's session """
    def get(self, request):
        user_dict = {
            "isAuthenticated": request.user.is_authenticated,
            "isAdmin": request.user.is_staff,
            "userName": request.user.username,
        }
        return HttpResponse(dumps(user_dict))


class AuthLoginView(View):
    """ Attempt to Login a user based on the supplied password """
    def post(self, request):
        dict = {"message": ""}

        try:
            username = request.POST.get("userName")
            password = request.POST.get("password")
            user = authenticate(username=username, password=password)
            if user:
                # set the user in the session to be handed back to the user
                login(request, user)
                dict["message"] = "Successfully authenticated"
                return HttpResponse(dumps(dict), status=200)

        except Exception as e:
            pass
        dict["message"] = "Username or password incorrect, or perhaps everyone secretly hates you?"
        return HttpResponse(dumps(dict), status=401)
