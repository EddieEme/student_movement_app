from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth.backends import ModelBackend
from django.db import models
from school.models import School

class User(AbstractUser):
    school = models.ForeignKey(School, on_delete=models.CASCADE, null=True, blank=True)
    groups = models.ManyToManyField(Group, related_name='custom_user_set')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set') 

    def save(self, *args, **kwargs):
        if not self.is_superuser and self.school:
            self.username = self.school.school_code
        super().save(*args, **kwargs)

    def __str__(self):
        if self.is_superuser:
            return f"Superuser: {self.username}"
        return f"{self.username} - {self.school.school_name if self.school else 'No School'}"

    @property
    def is_school_user(self):
        return bool(self.school)
    
class SchoolCodeBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
                return None