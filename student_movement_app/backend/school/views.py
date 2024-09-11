from .models import School, Student
# from rest_framework.serializers  import Serializer
from .serializers import SchoolSerializer, StudentSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated




@api_view(['POST'])
@permission_classes([AllowAny])
def create_school(request):
    school = SchoolSerializer(data=request.data)
    if school.is_valid():
        school.save()
        return Response(school.data, status=status.HTTP_201_CREATED)
    return Response(school.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register_student(request):
    """
    Registers a new student.
    """
    school_code = request.data.get('school_code')
    student_data = request.data.get('student_data', {})

    try:
        school = School.objects.get(school_code=school_code)
    except School.DoesNotExist:
        return Response({'error': 'School not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Validate student data
    serializer = StudentSerializer(data=student_data)
    if serializer.is_valid():
        student = Student(school=school, **serializer.validated_data)
        student.save()
        return Response({'message': 'Student registered successfully', 'student': serializer.data}, status=status.HTTP_201_CREATED)
    else:
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