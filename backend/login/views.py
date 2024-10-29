from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from login.models import UserProfile
from school.models import School
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError



User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        try:
            user_profile = UserProfile.objects.get(user=user)
            school = user_profile.school
            
            refresh = RefreshToken.for_user(user)
            response = Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'username': user.username,
                    'school': school.school_name if school else 'No School',
                    'school_code': school.school_code if school else 'No Code'
                }
            }, status=status.HTTP_200_OK)
            
            # Set the JWT as a cookie
            response.set_cookie(
                key='access_token',
                value=str(refresh.access_token),
                httponly=True,  # Makes the cookie inaccessible to JavaScript
                samesite='Lax',  # Provides some CSRF protection
                secure=True,  # Only send cookie over HTTPS
                max_age=3600  # Cookie expiration time in seconds
            )
            
            return response
        
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Invalid username or password.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_view(request):
    try:
        # Extract the refresh token from the request
        token = request.data.get('refresh_token')
        if token:
            # Blacklist the refresh token (or any other logic to invalidate it)
            try:
                refresh_token = RefreshToken(token)
                refresh_token.blacklist()
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    school_code = request.data.get('school_code')
    is_staff = request.data.get('is_staff', False)
    
    if not username or not password or not email or not school_code:
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Check if school exists
        school = School.objects.get(school_code=school_code)
        
        # Ensure only one user per school
        if UserProfile.objects.filter(school=school).exists():
            return Response({'error': 'A user already exists for this school.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create new user
        user = User.objects.create_user(username=username, password=password, email=email, is_staff=is_staff)
        
        # Create user profile linked to school
        UserProfile.objects.create(user=user, school=school)
        
        return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
    
    except School.DoesNotExist:
        return Response({'error': 'Invalid school code.'}, status=status.HTTP_400_BAD_REQUEST)
    except IntegrityError:
        return Response({'error': 'A user with this email or username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
