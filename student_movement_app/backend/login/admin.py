from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'is_superuser', 'get_school')
    list_filter = ('is_staff', 'is_active', 'is_superuser', 'school__school_name')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('School', {'fields': ('school',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active', 'is_superuser', 'school',)}
        ),
    )
    search_fields = ('username', 'email', 'school__school_name')
    ordering = ('username',)

    def get_school(self, obj):
        return obj.school.school_name if obj.school else 'N/A'
    get_school.short_description = 'School'

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(school=request.user.school)

admin.site.register(User, CustomUserAdmin)