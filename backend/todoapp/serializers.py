from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import Project, ToDo
from users.models import User
from users.serializers import UserSerializer


class UserMiniSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']


class ProjectSerializer(ModelSerializer):
    # users = UserSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = ['id', 'project', 'text', 'created_at', 'updated_at', 'created_by', 'is_active', 'is_deleted']
