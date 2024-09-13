from django.contrib.auth.backends import BaseBackend
from school.models import School

from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from school.models import School

class SchoolCodeBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Retrieve the school by school code
            school = School.objects.get(school_code=username)
            # Get the associated user profile with the school
            profile = User.objects.get(profile__school=school)
            # Check the user's password
            if profile.check_password(password):
                return profile
        except (School.DoesNotExist, User.DoesNotExist):
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
