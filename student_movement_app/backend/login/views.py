from django.forms import ValidationError
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from login.models import User
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token 
from school.models import School
from .serializers import UserSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    school_code = request.data.get('school_code')
    password = request.data.get('password')
    
    if not school_code or not password:
        return Response({'error': 'Both school code and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        school = School.objects.get(school_code=school_code)
    except School.DoesNotExist:
        return Response({'error': 'Invalid school code.'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=school_code, password=password)
     
    if user is not None:
        if user.school == school:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User does not belong to this school.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Invalid school code or password.'}, status=status.HTTP_400_BAD_REQUEST)


User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    data = request.data
    
    required_fields = ['school_code', 'password', 'email']
    for field in required_fields:
        if field not in data:
            return Response({'error': f'{field} is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        school = School.objects.get(school_code=data['school_code'])
    except School.DoesNotExist:
        return Response({'error': 'Invalid school code.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=data['school_code']).exists():
        return Response({'error': 'A user for this school already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=data['school_code'],
        email=data['email'],
        password=data['password'],
    )

    # Set user as staff to access admin panel
    user.is_staff = True
    
    user.save()

    return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
