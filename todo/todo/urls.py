from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from project.views import ProjectModelViewSet, TodoModelViewSet
from users.views import UserCustomViewSet

router = DefaultRouter()
router.register('users', UserCustomViewSet, basename='users')
router.register('project', ProjectModelViewSet, basename='project')
router.register('todo', TodoModelViewSet, basename='todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    # path('api-token-auth/', views.obtain_auth_token),
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
]
