from rest_framework.viewsets import GenericViewSet, ModelViewSet
from users.models import Users
from users.serializers import UsersModelSerializer, UsersModelSerializerBase


class UserCustomViewSet(ModelViewSet):
    queryset = Users.objects.all()

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UsersModelSerializerBase
        return UsersModelSerializer
# для тестирования в cmd
# import requests
# response_headers = requests.get('http://127.0.0.1:8000/api/users/', headers={'Accept': 'application/json; version=2.0'})
# response = requests.get('http://127.0.0.1:8000/api/users/')
# print(response_headers.json())
# print(response.json())
