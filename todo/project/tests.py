from mixer.backend.django import mixer
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase

from project.models import Project, Todo
from project.views import TodoModelViewSet, ProjectModelViewSet
from users.models import Users


class TestTodoProjectViewSet(TestCase):
    def setUp(self):
        self.url_todo = '/api/todo/'
        self.url_project = '/api/project/'
        self.user_admin = Users.objects.create_superuser('dasha', 'dasha@mail.ru', 'a110596a')
        self.password_test = 'a110596a'
        self.username_test = 'dasha'
        self.test_data_project = {'name_project': 'project1', ' link_repo': 'http://127.0.0.1:8000/api/todo/4/',
                                  "users": [1]}
        self.test_data_projects_update = mixer.blend(Project)

    def test_get_list_todo(self):
        factory = APIRequestFactory()
        request = factory.get(self.url_todo)
        view = TodoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_project(self):
        factory = APIRequestFactory()
        request = factory.get(self.url_project)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # создание проекта авторизированным пользователем
    def test_post_project_auth(self):
        factory = APIRequestFactory()
        data = {'name_project': 'project1', ' link_repo': 'http://127.0.0.1:8000/api/todo/4/',
                "users": [1]}
        request = factory.post(f'{self.url_project}', data, format='json')
        force_authenticate(request, self.user_admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_client_todo_list(self):
        todo = mixer.blend(Todo)
        client = APIClient()
        response = client.get(f'{self.url_todo}{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # тестовое изменение todo неавторизированным пользователем
    def test_client_todo_put_unauth(self):
        todo = mixer.blend(Todo)
        client = APIClient()
        response = client.put(f'{self.url_todo}{todo.id}/', {"textTodo": 'iiiiiiiiiii'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # тестовое создание проекта авторизированным пользователем
    def test_client_project_create(self):
        client = APIClient()
        admin = self.user_admin
        client.login(username=self.username_test, password=self.password_test)
        response = client.post(self.url_project, self.test_data_project)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # удаление проекта авторизированным пользователем
    def test_client_delete_project(self):
        client = APIClient()
        admin = self.user_admin
        client.login(username=self.username_test, password=self.password_test)
        project = Project.objects.create(name_project='project14', link_repo='http://127.0.0.1:8000/api/todo/44/')
        response = client.delete(f'{self.url_project}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def tearDown(self) -> None:
        pass


class TestTodoProjectAPITestCase(APITestCase):
    def setUp(self):
        self.url_todo = '/api/todo/'
        self.url_project = '/api/project/'
        self.user_admin = Users.objects.create_superuser('dasha', 'dasha@mail.ru', 'a110596a')
        self.password_test = 'a110596a'
        self.username_test = 'dasha'
        self.test_data_project = {'name_project': 'project1', ' link_repo': 'http://127.0.0.1:8000/api/todo/4/'
            , "users": [1]}

    def test_get_list_todo(self):
        response = self.client.get(self.url_todo)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project(self):
        admin = self.user_admin
        self.client.login(username=self.username_test, password=self.password_test)
        response = self.client.post(self.url_project, self.test_data_project)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
