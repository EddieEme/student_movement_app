from django.db import models
from django.utils.crypto import get_random_string

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
    school = models.ForeignKey(School, on_delete=models.CASCADE)  # Updated field name
    student_name = models.CharField(max_length=225)
    date_of_birth = models.DateField()
    state_of_origin = models.CharField(max_length=25)
    lga_of_origin = models.CharField(max_length=30)
    town = models.CharField(max_length=225)
    student_class = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.student_name} ({self.school.school_name})"

    