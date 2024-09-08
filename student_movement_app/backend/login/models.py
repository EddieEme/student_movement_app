from django.db import models
from django.contrib.auth.models import AbstractUser
from school.models import School


class User(AbstractUser):
    school = models.ForeignKey(School, on_delete=models.CASCADE)   
    
    USERNAME_FIELD = 'username'
    
    def save(self, *args, **kwargs):
        self.username = self.school.school_code
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.username} - {self.school.school_name}"
    
    
    




    
        
    
    
