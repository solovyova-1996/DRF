from django.core.management import BaseCommand

from project.models import Project, Todo
from users.models import Users


class Command(BaseCommand):
    def handle(self, *args, **options):
        test_user_1 = Users.objects.create(username='dasha1', first_name='Даша1', last_name='Шатилова1',
                                           email='shatdar@yandex.ru')
        test_user_2 = Users.objects.create(username='nata', first_name='Наталья', last_name='Иванова',
                                           email='shatdar@mail.ru')
        test_user_3 = Users.objects.create(username='anastasiy', first_name='Анастасия', last_name='Петрова',
                                           email='anastasiy@yandex.ru')
        test_user_4 = Users.objects.create(username='stas', first_name='Станислав', last_name='Соловьев',
                                           email='mortifeus@yandex.ru')
        super_user = Users.objects.create_superuser(username='dasha', first_name='Даша', last_name='Шатилова', email='',
                                                    password='1')

        test_project_1=Project.objects.create(name_project='project1',link_repo="http://127.0.0.1:8000/users1/")
        test_project_1.users.set([1,2])
        test_project_2 = Project.objects.create(name_project='project2', link_repo="http://127.0.0.1:8000/users2/")
        test_project_2.users.set([2])
        test_project_3 = Project.objects.create(name_project='project3', link_repo="http://127.0.0.1:8000/users3/")
        test_project_3.users.set([3,4,1])

        test_todo_1=Todo.objects.create(project=test_project_1,user=test_user_1,text_todo='new_todo1')
        test_todo_2 = Todo.objects.create(project=test_project_2, user=test_user_2, text_todo='new_todo2')
        test_todo_3 = Todo.objects.create(project=test_project_3, user=test_user_3, text_todo='new_todo3')