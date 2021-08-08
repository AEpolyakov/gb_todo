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
        # print(f'{self.projects=} \n{self.users=}')

    # def test_get_list(self):
        # fact1 = APIRequestFactory()
        # request = fact1.get('/api/users/')
        # force_authenticate(request, self.admin)
        # view = ProjectViewSet.as_view({'get': 'list'})
        # response = view(request)
        #
        # # print(f'\n\n\n testcase {response.data=}')
        # self.assertEqual(response.status_code, status.HTTP_200_OK)



class TestApiClient(TestCase):

    def setUp(self):
        self.users = [mixer.blend(User) for user in range(4)]
        self.projects = [mixer.blend(Project) for project in range(4)]

        self.admin_password = '1111'
        self.admin = User.objects.create_superuser('admin@admin.ru', self.admin_password)
        print(f'{self.projects=} \n{self.users=}')
        self.client = APIClient()

    def test_get_user_list_200(self):
        self.client.login(username=self.admin.email, password=self.admin_password)
        response = self.client.get(f'/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_list_401(self):
        response = self.client.get(f'/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_project(self):
        self.client.login(username=self.admin.email, password=self.admin_password)
        response = self.client.get(f'/api/projects/') # {'name': 'test_proj', 'href': 'aaaaa.com', 'users': ['1', '2']})
        print(f'{response.data=}')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestApiTestCase(APITestCase):
    pass


