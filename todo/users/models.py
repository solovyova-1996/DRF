from django.contrib.auth.models import AbstractUser
from django.db import models


class Users(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return f'(id-{self.id}){self.last_name} {self.first_name}'
