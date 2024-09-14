from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import UserProfile

User = get_user_model()

# Unregister the default User admin
admin.site.unregister(User)

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email'),
        }),
    )

    list_display = ('username', 'email', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email')
    ordering = ('username',)

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'school')
    search_fields = ('user__username', 'school__school_name')

admin.site.register(User, UserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
