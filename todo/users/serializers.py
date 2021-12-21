from rest_framework.serializers import ModelSerializer
from users.models import Users


class UsersModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        # ('id', 'username', 'first_name', 'last_name', 'email')

# class UsersModelSerializerBase(ModelSerializer):
#     class Meta:
#         model = Users
#         fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')
