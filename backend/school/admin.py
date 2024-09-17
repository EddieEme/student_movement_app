from django.contrib import admin
from .models import School, Student, Transfer

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('school_code', 'school_name', 'state', 'lga', 'town', 'address', 'year_establishment', 'location', 'type_of_school', 'school_level')

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'school', 'date_of_birth', 'state_of_origin', 'lga_of_origin', 'town', 'student_class')

@admin.register(Transfer)
class TransferAdmin(admin.ModelAdmin):
    list_display = ('student', 'from_school', 'to_school', 'status')
    fields = ('student', 'from_school', 'to_school', 'status', 'approval_date')
    readonly_fields = ('request_date',)