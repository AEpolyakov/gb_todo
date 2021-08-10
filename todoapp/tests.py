import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .views import ProjectViewSet, ToDoViewSet
from .models import Project, ToDo
from users.views import UserViewSet
from users.models import User


class TestAPIRequestFactory(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.users = [mixer.blend(User) for user in range(4)]
        self.projects = [mixer.blend(Project) for project in range(4)]
        self.admin = User.objects.create_superuser('admin@admin.ru', '1111')

    def test_get_list_401(self):
        request = self.factory.get('/api/users/')
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_200(self):
        request = self.factory.get('/api/users/')
        force_authenticate(request, self.admin)
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_todo(self):
        request = self.factory.post('/api/todo/', {
            'project': '1',
            'text': 'test test test',
            'created_by': "1",
            'is_active': "true",
            'is_deleted': "false",
        })
        force_authenticate(request, self.admin)
        view = ToDoViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestApiClient(TestCase):

    def setUp(self):
        self.users = [mixer.blend(User) for user in range(4)]
        self.projects = [mixer.blend(Project) for project in range(4)]
        self.admin_password = '1111'
        self.admin = User.objects.create_superuser('admin@admin.ru', self.admin_password)
        self.client = APIClient()

    def test_get_user_list_200(self):
        self.client.login(username=self.admin.email, password=self.admin_password)
        response = self.client.get(f'/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_project(self):
        self.client.login(username=self.admin.email, password=self.admin_password)
        response = self.client.post(f'/api/projects/', {
            'name': 'test_proj',
            'href': '',
            'users': ["1"],
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestApiTestCase(APITestCase):
    def setUp(self):
        self.users = [mixer.blend(User) for user in range(4)]
        self.projects = [mixer.blend(Project) for project in range(4)]
        self.admin_password = '1111'
        self.admin = User.objects.create_superuser('admin@admin.ru', self.admin_password)

    def test_get_user_list_401(self):
        response = self.client.get(f'/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_patch_project(self):
        new_name = 'test_proj'
        self.client.login(username=self.admin.email, password=self.admin_password)
        response = self.client.patch(f'/api/projects/1/', {
            'name': new_name,
        })
        self.assertEqual(response.data["name"], new_name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
