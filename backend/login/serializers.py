from django.contrib.auth import get_user_model
from rest_framework import serializers
from school.models import School
from login.models import UserProfile

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    school_code = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'school_code', 'is_superuser']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def create(self, validated_data):
        school_code = validated_data.pop('school_code', None)
        is_superuser = validated_data.get('is_superuser', False)

        # Handle superuser creation separately (no profile required)
        if is_superuser:
            user = User.objects.create_superuser(
                username=validated_data['username'],
                password=validated_data['password'],
                email=validated_data.get('email', '')
            )
            return user

        # Ensure school_code is provided for regular users
        if not school_code:
            raise serializers.ValidationError({'school_code': 'This field is required for regular users.'})

        # Check if the school with the given code exists
        try:
            school = School.objects.get(school_code=school_code)
        except School.DoesNotExist:
            raise serializers.ValidationError({'school_code': 'School with this code does not exist.'})

        # Ensure only one user profile per school
        if UserProfile.objects.filter(school=school).exists():
            raise serializers.ValidationError({'school_code': 'A user is already associated with this school.'})

        # Create the regular user
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )

        # Create the user profile and associate the school
        UserProfile.objects.create(user=user, school=school)

        return user