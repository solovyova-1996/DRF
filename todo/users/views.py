from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet

from users.models import Users
from users.serializers import UsersModelSerializer


class UserCustomViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
