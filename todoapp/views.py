from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import mixins, status
from .models import Project, ToDo
from .serializers import ProjectSerializer, ToDoSerializer
from .filters import ProjectFilter, TodoFilter


class ProjectPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    filterset_class = ProjectFilter
    pagination_class = ProjectPagination


class TodoPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoViewSet(ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.filter(is_deleted=False)
    pagination_class = TodoPagination
    filterset_class = TodoFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data={'is_deleted': True}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        print(f'{instance=} {serializer.data}')
        return Response(status=status.HTTP_204_NO_CONTENT)




