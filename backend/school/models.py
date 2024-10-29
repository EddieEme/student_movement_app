from datetime import timezone
from django.db import models
from django.utils.crypto import get_random_string
from django.contrib.auth import get_user_model


User = get_user_model()

# Create your models here.

def generate_school_code():
    while True:
        code = get_random_string(length=8)
        if not School.objects.filter(school_code=code).exists():
            return code
        
class School(models.Model):
    school_code = models.CharField(max_length=8, unique=True, default=generate_school_code)
    school_name = models.CharField(max_length=222)
    state = models.CharField(max_length=20)
    lga = models.CharField(max_length=25)
    town = models.CharField(max_length=35)
    address = models.CharField(max_length=225)
    year_establishment = models.IntegerField()
    location = models.CharField(max_length=10)
    type_of_school = models.CharField(max_length=15, null=True)
    school_level = models.CharField(max_length=10, null=True)

    def __str__(self):
        return f"{self.school_code} ({self.school_name} {self.state})"
    
    
class Student(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=15, unique=True)
    student_name = models.CharField(max_length=225)
    date_of_birth = models.DateField()
    state_of_origin = models.CharField(max_length=25)
    lga_of_origin = models.CharField(max_length=30)
    town = models.CharField(max_length=225)
    student_class = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.student_name} ({self.school.school_name})"


class Transfer(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    student = models.ForeignKey('Student', on_delete=models.CASCADE, related_name='transfers')
    from_school = models.ForeignKey('School', on_delete=models.CASCADE, related_name='transfers_from')
    to_school = models.ForeignKey('School', on_delete=models.CASCADE, related_name='transfers_to')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Transfer {self.student} from {self.from_school} to {self.to_school} - {self.status}"
    
    
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    transfer_request = models.ForeignKey('Transfer', on_delete=models.CASCADE, null=True, blank=True, related_name='notifications')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user} - {self.message[:20]}"