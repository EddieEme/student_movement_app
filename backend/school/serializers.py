from rest_framework import serializers
from .models import School, Student

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'
        


class StudentSerializer(serializers.ModelSerializer):
    school = serializers.SlugRelatedField(slug_field='school_code', queryset=School.objects.all())
    class Meta:
        model = Student
        fields = ['student_id', 'student_name', 'date_of_birth', 'state_of_origin', 'lga_of_origin', 'town', 'student_class', 'school']