import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, ToDo
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


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

    user_by_email = graphene.List(UserType, email=graphene.String(required=True))

    def resolve_user_by_email(root, info, email):
        return User.objects.filter(email=email)

    todo_by_user_email = graphene.List(TodoType, email=graphene.String(required=True))

    def resolve_todo_by_user_email(root, info, email):
        user = User.objects.get(email=email)
        return ToDo.objects.filter(created_by=user)


class TodoMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        id = graphene.ID(required=True)

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, text, id):
        todo = ToDo.objects.get(pk=id)
        todo.text = text
        todo.save()
        return TodoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo_text = TodoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
