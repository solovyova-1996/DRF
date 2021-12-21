from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from project.views import ProjectModelViewSet, TodoModelViewSet
from users.views import UserCustomViewSet

router = DefaultRouter()
router.register('users', UserCustomViewSet, basename='users')
router.register('project', ProjectModelViewSet, basename='project')
router.register('todo', TodoModelViewSet, basename='todo')

schema_view = get_schema_view(
    openapi.Info(
        title='Todo',
        default_version='',
        description='Documentation for the Todo project',
        contact=openapi.Contact(email='shatdar@yandex.ru'),
        license=openapi.License(name='Todo License'),
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    # path('api-token-auth/', views.obtain_auth_token),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
    path('swagger/', schema_view.with_ui('swagger')),
    path('swagger/<str:format>/', schema_view.without_ui()),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
