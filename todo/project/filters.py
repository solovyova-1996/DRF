from django_filters.rest_framework import FilterSet, CharFilter, NumberFilter

from project.models import Project, Todo


class ProjectFilter(FilterSet):
    name_project = CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name_project']


class TodoFilter(FilterSet):
    project = CharFilter()
    created_at = NumberFilter(field_name='created_at', lookup_expr='day')
    created_at__gt = NumberFilter(field_name='created_at', lookup_expr='day__gt')
    created_at__lt = NumberFilter(field_name='created_at', lookup_expr='day__lt')

    class Meta:
        model = Todo
        fields = ['project', 'created_at']
