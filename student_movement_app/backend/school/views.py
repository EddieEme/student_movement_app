from .models import School
# from rest_framework.serializers  import Serializer
from .serializers import SchoolSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly




@api_view(['POST'])
@permission_classes([AllowAny])
def create_school(request):
    school = SchoolSerializer(data=request.data)
    if school.is_valid():
        school.save()
        return Response(school.data, status=status.HTTP_201_CREATED)
    return Response(school.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def school_list(request):
    schools = School.objects.all()
    serializer = SchoolSerializer(schools, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
@permission_classes([AllowAny])
def school_detail(request, pk):
    """
    Handle GET requests to retrieve a school by primary key.
    Handle PUT requests to update a school by primary key.
    """
    try:
        school = School.objects.get(pk=pk)
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

