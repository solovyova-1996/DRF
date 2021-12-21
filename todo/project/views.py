from rest_framework.pagination import LimitOffsetPagination
# from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer
from rest_framework.viewsets import ModelViewSet

from project.filters import ProjectFilter, TodoFilter
from project.models import Project, Todo
from project.serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # pagination_class = TodoLimitOffsetPagination
    filterset_class = TodoFilter

    # def perform_destroy(self, instance):
    #     obj = self.get_object()
    #     if obj.is_active:
    #         obj.is_active = False
    #     else:
    #         obj.is_active = True
    #     obj.save()
