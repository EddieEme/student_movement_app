from django.urls import path, include
from rest_framework.routers import DefaultRouter
from login.views import login_view, logout_view, register_view
from school.views import CreateSchoolView, NotificationView, RegisterStudentView, SchoolStatisticsView, StudentListView, StudentUpdateDeleteView, TransferRequestView, school_list
# Import other views as needed, e.g.:
# from school.views import SchoolViewSet, StudentViewSet, TransferViewSet

router = DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
    path('create_school/', CreateSchoolView.as_view(), name='create_school'),
    path('school_list/', school_list, name='school_list' ),
    path('request-transfer/', TransferRequestView.as_view(), name='request-transfer'),
    path('notifications/', NotificationView.as_view(), name='notifications'),
    path('student/<str:student_id>/', StudentUpdateDeleteView.as_view(), name='student-update-delete'),
     path('students/', StudentListView.as_view(), name='student-list'),
    path('add_student/', RegisterStudentView.as_view(), name='add_student'),
    path('school_statistics/', SchoolStatisticsView.as_view(), name='school_statistics'),
]