from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login, logout
from graphene_django.views import GraphQLView
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from core.models.users import CTFUser
from core.forms import SignUpForm


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
        return JsonResponse(user_dict)


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
                return JsonResponse(dict, status=200)

        except Exception as e:
            pass
        dict["message"] = "Username or password incorrect, or perhaps everyone secretly hates you?"
        return JsonResponse(dict, status=401)


class AuthLogOutView(View):
    """ Logs out the current user, invalidating their session """
    def post(self, request):
        logout(request)
        return JsonResponse({"message": "Logged out"})

    def get(self, request):
        logout(request)
        return HttpResponse("Logged out")


class AuthSignUpView(View):
    def post(self, request):
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            login(request, user)
            return JsonResponse({"message":"Account " + username + " successfully created"})

        else:
            return JsonResponse(form.errors, status=400)

