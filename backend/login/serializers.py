from django.contrib.auth import get_user_model
from rest_framework import serializers
from login.models import UserProfile
from school.models import School

User = get_user_model()

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    school_code = serializers.CharField(write_only=True, required=False)
    is_staff = serializers.BooleanField(write_only=True, required=False, default=False)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'school_code', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        school_code = validated_data.pop('school_code', None)
        is_staff = validated_data.pop('is_staff', False)

        if is_staff:
            user = User.objects.create_user(
                username=validated_data['username'],
                password=validated_data['password'],
                email=validated_data.get('email', ''),
                is_staff=is_staff
            )
            if school_code:
                try:
                    school = School.objects.get(school_code=school_code)
                    UserProfile.objects.create(user=user, school=school)
                except School.DoesNotExist:
                    raise serializers.ValidationError({'school_code': 'School with this code does not exist.'})
            return user

        if not school_code:
            raise serializers.ValidationError({'school_code': 'This field is required for regular users.'})

        try:
            school = School.objects.get(school_code=school_code)
        except School.DoesNotExist:
            raise serializers.ValidationError({'school_code': 'School with this code does not exist.'})

        if UserProfile.objects.filter(school=school).exists():
            raise serializers.ValidationError({'school_code': 'A user is already associated with this school.'})

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
            is_staff=is_staff
        )

        UserProfile.objects.create(user=user, school=school)
        return user

    def update(self, instance, validated_data):
        school_code = validated_data.pop('school_code', None)
        if school_code:
            try:
                school = School.objects.get(school_code=school_code)
            except School.DoesNotExist:
                raise serializers.ValidationError({'school_code': 'School with this code does not exist.'})

            if UserProfile.objects.filter(school=school).exclude(user=instance).exists():
                raise serializers.ValidationError({'school_code': 'A user is already associated with this school.'})

            UserProfile.objects.update_or_create(
                user=instance,
                defaults={'school': school}
            )

        return super().update(instance, validated_data)