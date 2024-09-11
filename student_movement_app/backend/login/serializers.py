from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from school.models import School
from .models import User

class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  school_code = serializers.CharField(required=False)  # Optional field

  class Meta:
    model = User
    fields = ['school_code', 'email', 'password']

  def create(self, validated_data):
    password = validated_data.pop('password')
    school_code = validated_data.get('school_code')
    school = None

    if school_code:
        try:
            school = School.objects.get(school_code=school_code)
        except ObjectDoesNotExist:
            raise serializers.ValidationError("School with code '%s' not found" % school_code)

    user = User.objects.create(
      school=school,
      email=validated_data['email'],
      username=school_code if school_code else validated_data.get('username', None) 
    )
    user.set_password(password)
    user.save()
    return user