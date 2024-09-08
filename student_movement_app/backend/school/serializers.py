from rest_framework import serializers
from .models import School

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['school_name', 'school_code', 'address', 'town', 'lga', 'state', 'location', 'year_establishment']