from rest_framework import serializers
from school.models import School
from school.serializers import SchoolSerializer
from .models import User

class UserSerializer(serializers.ModelSerializer):
    school = SchoolSerializer()
    password = serializers.CharField(write_only=True)
    school_code = serializers.CharField(source='username', read_only=True)

    class Meta:
        model = User
        fields = ['school_code', 'email', 'password', 'school']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        school_data = validated_data.pop('school')
        password = validated_data.pop('password')
        
        # Create School instance
        school = School.objects.create(**school_data)
        
        # Create User instance
        user = User.objects.create(
            school=school,
            email=validated_data['email'],
            username=school.school_code  # Set username to school_code
        )
        user.set_password(password)
        user.save()
        
        return user