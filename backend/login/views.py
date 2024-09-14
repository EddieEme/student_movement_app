from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken

from login.models import UserProfile
from .serializers import UserSerializer
from school.models import School
from django.contrib.auth import authenticate, get_user_model
from .models import UserProfile

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    school_code = request.data.get('school_code')
    password = request.data.get('password')
    
    if not school_code or not password:
        return Response({'error': 'Both school code and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Authenticate using the custom SchoolCodeBackend
    user = authenticate(request, username=school_code, password=password)

    if user is not None:
        try:
            # Find the school by school_code
            school = School.objects.get(school_code=school_code)
            
            # Find the UserProfile associated with this user
            user_profile = UserProfile.objects.get(user=user)
            
            # Check if the user's profile is associated with the correct school
            if user_profile.school != school:
                return Response({'error': 'User is not associated with the provided school code.'}, status=status.HTTP_400_BAD_REQUEST)

            # JWT token generation
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'username': user.username,
                    'school': school.school_name,
                    'school_code': school.school_code
                }
            }, status=status.HTTP_200_OK)
        
        except School.DoesNotExist:
            return Response({'error': 'School with this code does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Invalid school code or password.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)