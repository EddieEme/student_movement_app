from django.urls import path
from .views import *


app_name = 'school'

urlpatterns = [
    path('api/create_school/', CreateSchoolView.as_view(), name='create_school'),
    path('api/school_list/', school_list, name='school_list' ),
    path('api/update/', school_detail, name='school_detail'),
    path('api/school_info/', school_info, name='school_info'),
    path('api/register_student/', RegisterStudentView.as_view(), name='register_student'),

]