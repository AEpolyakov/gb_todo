import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, ToDo
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', ]


class TodoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    all_todos = graphene.List(TodoType)

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    all_users = graphene.List(UserType)

    def resolve_all_users(root, info):
        return User.objects.all()

    project_by_name = graphene.List(ProjectType, name=graphene.String(required=True))

    def resolve_project_by_name(root, info, name):
        return Project.objects.filter(name=name)


schema = graphene.Schema(query=Query)
