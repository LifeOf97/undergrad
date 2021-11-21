from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from rest_framework import authentication
from .models import Staff

UserModel = get_user_model()


class StaffAuthBackend(ModelBackend):
    """
    Custom model backend that checks the profile model belonging to
    the current request and confirm if the staf id belongs to the profile.
    """
    def authenticate(self, request, username=None, password=None):
        # at this stage, username is the staff_id requested for at the frontend
        if username is None or password is None:
            return
        
        try: # to get the staff username in the profile (user) model
            username = Staff.objects.get(staff_id__iexact=username).profile.username
        except Staff.DoesNotExist:
            return
        else: # if staff exists
            try: # to get the staff profile instance
                user = UserModel._default_manager.get(username=username)
            except UserModel.DoesNotExist:
                return
            else: # if user profile instance exists
                if user.check_password(password) and self.user_can_authenticate(user):
                    return user



class BearerAuthentication(authentication.TokenAuthentication):
    keyword = "Bearer"