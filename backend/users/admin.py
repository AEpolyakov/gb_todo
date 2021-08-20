from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class UserAdminConfig(UserAdmin):
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('-first_name',)
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'first_name', 'last_name', 'password', 'is_superuser')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'is_active', 'is_staff'),
        },
        ),
    )


admin.site.register(User, UserAdminConfig)

# Register your models here.
