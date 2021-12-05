from django.contrib import admin
from users.models import Users
from django.contrib.auth.admin import UserAdmin

admin.site.register(Users, UserAdmin)
