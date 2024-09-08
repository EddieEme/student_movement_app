from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
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

class SchoolUserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
