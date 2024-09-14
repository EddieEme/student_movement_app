from django.shortcuts import get_object_or_404
from .models import School, Student
# from rest_framework.serializers  import Serializer
from .serializers import SchoolSerializer, StudentSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated




# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_school(request):
#     school = SchoolSerializer(data=request.data)
#     if school.is_valid():
#         school.save()
#         return Response(school.data, status=status.HTTP_201_CREATED)
#     return Response(school.errors, status=status.HTTP_400_BAD_REQUEST)

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
        Registers a new student linked to the school identified by the user's username.
        """
        # Use the authenticated user's username as the school_code
        school_code = request.user.username 
        # Fetch the school associated with the user's school_code
        school = get_object_or_404(School, school_code=school_code)

        # Retrieve student data from the request
        student_data = request.data.copy()

        # Log the received data to debug
        print(f"Received student data: {student_data}")

        # Include the school in the student data
        student_data['school'] = school.school_code
    
        # Validate student data
        serializer = self.get_serializer(data=student_data)
        if serializer.is_valid():
            student_id = serializer.validated_data.get('student_id')

            # Check if a student with the provided student_id already exists
            if Student.objects.filter(student_id=student_id).exists():
                return Response({'error': 'Student with this ID already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Save the student if no duplicate is found
            student = serializer.save()
            return Response({'message': 'Student registered successfully', 'student': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            # Log errors to debug
            print(f"Validation errors: {serializer.errors}")
            return Response({'error': 'Invalid student data', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def school_list(request):
    schools = School.objects.all()
    serializer = SchoolSerializer(schools, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def school_detail(request, school_code):
    """
    Handle GET requests to retrieve a school by primary key.
    Handle PUT requests to update a school by primary key.
    """
    try:
        school = School.objects.get(school_code=school_code)
    except School.DoesNotExist:
        return Response({'error': 'School not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SchoolSerializer(school)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = SchoolSerializer(school, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    from django.urls import resolve


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def school_info(request):
    school_code = request.user.username
    
    try:
        school = School.objects.get(school_code=school_code)
    except School.DoesNotExist:
        return Response({"error": "No school found for this user."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SchoolSerializer(school)
    
    # Gather additional information
    data = serializer.data
    data.update({
        'student_count': Student.objects.filter(school=school).count(),
    })
    
    return Response(data)
