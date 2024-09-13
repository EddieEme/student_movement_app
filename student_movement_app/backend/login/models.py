from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db import models
from school.models import School
from django.contrib.auth import get_user_model

User = get_user_model()

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    school = models.OneToOneField(School, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} - {self.school.school_name}'

   



@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        # Only create UserProfile if school is provided
        if hasattr(instance, 'school'):
            UserProfile.objects.create(user=instance, school=instance.school)
    else:
        # If the user already has a profile, ensure it's updated
        if hasattr(instance, 'profile'):
            instance.profile.save()


# class User(AbstractUser):
#     school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
#     groups = models.ManyToManyField(
#         'auth.Group',
#         related_name='custom_user_set', 
#         blank=True,
#     )
#     user_permissions = models.ManyToManyField(
#         'auth.Permission',
#         related_name='custom_user_set',
#         blank=True,
#     )
    
#     def save(self, *args, **kwargs):
#         if not self.is_superuser and not self.school:
#             raise ValueError("Non-superuser must be associated with a school.")
#         if not self.is_superuser and self.school:
#             self.username = self.school.school_code
#         super().save(*args, **kwargs)

#     def __str__(self):
#         if self.is_superuser:
#             return f"Superuser: {self.username}"
#         return f"{self.username} - {self.school.school_name if self.school else 'No School'}"

#     @property
#     def is_school_user(self):
#         return not self.is_superuser
    

