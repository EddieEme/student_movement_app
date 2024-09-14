from django.urls import path
from .views import *


app_name = 'login'

urlpatterns = [
    path('api/login/', login_view, name='api_login'),
    # path('api/register/', SchoolUserRegistrationView.as_view(), name='school-user-registration'),
    path('api/register/', register_view, name='school-user-registration')
]