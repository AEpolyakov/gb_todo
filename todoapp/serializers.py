from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from rest_framework import serializers as s
from .models import Project, ToDo
from users.models import User
from users.serializers import UserSerializer


class UserMiniSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']


class ProjectSerializer(ModelSerializer):
    users = UserMiniSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'

