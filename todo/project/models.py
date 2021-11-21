from django.db import models

from users.models import Users


class Project(models.Model):
    name_project = models.CharField(max_length=50)
    link_repo = models.URLField(blank=True)
    users = models.ManyToManyField(Users)

    def __str__(self):
        return f'{self.name_project}'


class Todo(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(Users, models.PROTECT)
    text_todo = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.id}'
