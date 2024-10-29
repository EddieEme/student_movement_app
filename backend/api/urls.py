from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from login.views import login_view, logout_view, register_view
from school.views import  * 

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
    path('create_school/', CreateSchoolView.as_view(), name='create_school'),
    path('school_list/', school_list, name='school_list' ),
    path('request_transfer/', TransferRequestView.as_view(), name='request-transfer'),
    path('approve_transfer/', ApproveTransferView.as_view(), name='approve_transfer'),
    path('notifications/', NotificationView.as_view(), name='notifications'),
    path('student/<str:student_id>/', StudentUpdateDeleteView.as_view(), name='student-update-delete'),
    path('students/', StudentListView.as_view(), name='student-list'),
    path('add_student/', RegisterStudentView.as_view(), name='add_student'),
    path('school_statistics/', SchoolStatisticsView.as_view(), name='school_statistics'),
    
    # Token authentication URLs
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
