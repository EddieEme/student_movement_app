from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from login.models import UserProfile
from .models import School, Student, Transfer, Notification
from rest_framework.views import APIView
from .serializers import SchoolSerializer, StudentSerializer, TransferSerializer, NotificationSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.pagination import PageNumberPagination

User = get_user_model()
# for paginatint table views
class NotificationPagination(PageNumberPagination):
    page_size = 10  # Display 10 notifications per page


# Handles school creation
class CreateSchoolView(generics.GenericAPIView):
    serializer_class = SchoolSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterStudentView(generics.GenericAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Registers a new student linked to the school identified by the user's profile.
        """
        try:
            # Ensure user profile exists and get the associated school
            user_profile = request.user.profile
            school = user_profile.school
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve student data from the request
        student_data = request.data.copy()

        # Automatically assign the school based on the logged-in user's school
        student_data['school'] = school.id  # Set the school ID directly

        # Validate and save student data
        serializer = self.get_serializer(data=student_data)
        if serializer.is_valid():
            student_id = serializer.validated_data.get('student_id')

            # Check if a student with the provided student_id already exists
            if Student.objects.filter(student_id=student_id).exists():
                return Response({'error': 'Student with this ID already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Save the student if no duplicate is found
            student = serializer.save(school=school)  # Explicitly save with the school
            return Response({'message': 'Student registered successfully', 'student': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid student data', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


   
        
# handles school list view 
@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def school_list(request):
    schools = School.objects.all()
    serializer = SchoolSerializer(schools, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class TransferRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_profile = request.user.profile
        user_school = user_profile.school

        student_id = request.data.get('student_id')
        to_school_code = request.data.get('to_school_code')

        # Validate input
        if not student_id or not to_school_code:
            return Response({'error': 'Student ID and destination school code are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the student and destination school
        student = Student.objects.filter(student_id=student_id, school=user_school).first()
        to_school = School.objects.filter(school_code=to_school_code).first()

        if not student:
            return Response({'error': 'Student not found or not in your school.'}, status=status.HTTP_404_NOT_FOUND)

        if not to_school:
            return Response({'error': 'Destination school not found.'}, status=status.HTTP_404_NOT_FOUND)

        if student.school == to_school:
            return Response({'error': 'Student is already in the destination school.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the transfer request
        transfer_data = {
            'student': student.id,
            'from_school': user_school.id,
            'to_school': to_school.id,
            'status': 'pending'
        }
        serializer = TransferSerializer(data=transfer_data)

        if serializer.is_valid():
            serializer.save()

            # Notify the user/admin of the new transfer request
            Notification.objects.create(
                user=request.user,  # Notify the requesting user
                message=f'Transfer request for {student.student_name} from {user_school.school_name} to {to_school.school_name}.',
                is_read=False
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Handles the notification view 
class NotificationView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
    pagination_class = NotificationPagination  # Add pagination

    def get_queryset(self):
        user = self.request.user
        queryset = Notification.objects.filter(user=user).order_by('-created_at')

        is_read = self.request.query_params.get('is_read')
        if is_read is not None:
            queryset = queryset.filter(is_read=is_read.lower() == 'true')

        return queryset



# Handles students update and delete
class StudentUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer
    lookup_field = 'student_id'  # Assuming student_id is passed in the URL

    def get_queryset(self):
        """
        Override get_queryset to restrict access to students only from the user's school.
        """
        user_school = self.request.user.profile.school
        return Student.objects.filter(school=user_school)

    def perform_update(self, serializer):
        """
        Override perform_update to add custom logic if needed.
        """
        serializer.save()

    def delete(self, request, *args, **kwargs):
        """
        Override delete to add any custom behavior for deletions.
        """
        student = self.get_object()
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class StudentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        user_profile = request.user.profile
        user_school = user_profile.school

        students = Student.objects.filter(school=user_school)
        
        try:
            # Ensure the user has a UserProfile
            user_profile = request.user.profile
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get the user's school from the profile
        user_school = user_profile.school

        # Retrieve students associated with the user's school
        students = Student.objects.filter(school=user_school)
        serializer = StudentSerializer(students, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
