from rest_framework import serializers
from .models import School, Student, Transfer, Notification
from django.contrib.auth import get_user_model

User = get_user_model()

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['school_code', 'school_name', 'state', 'lga', 'town', 'address', 'year_establishment', 'location', 'type_of_school', 'school_level']


class StudentSerializer(serializers.ModelSerializer):
    # Make the school field read-only
    school = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Student
        fields = ['student_id', 'student_name', 'date_of_birth', 'state_of_origin', 'lga_of_origin', 'town', 'student_class', 'school']

class TransferSerializer(serializers.ModelSerializer):
    student = serializers.SlugRelatedField(slug_field='student_id', queryset=Student.objects.all())
    from_school = serializers.SlugRelatedField(slug_field='school_code', queryset=School.objects.all())
    to_school = serializers.SlugRelatedField(slug_field='school_code', queryset=School.objects.all())

    class Meta:
        model = Transfer
        fields = ['id', 'student', 'from_school', 'to_school', 'status', 'request_date', 'approval_date']

class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Notification
        fields = ['user', 'message', 'is_read', 'created_at']


class SchoolStatisticsSerializer(serializers.Serializer):
    total_students = serializers.IntegerField()
    students_list = StudentSerializer(many=True)
    school_name = serializers.CharField()