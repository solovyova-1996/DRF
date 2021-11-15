from django.core.management.base import BaseCommand
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
