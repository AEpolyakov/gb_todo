from rest_framework.viewsets import GenericViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework import mixins
from .models import User
from .serializers import UserSerializer, UserSerializerV2


class UserViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet):
    queryset = User.objects.all()
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get_serializer_class(self):
        print(f'{self.request.version=}')
        if self.request.version == 'v2':
            return UserSerializerV2
        return UserSerializer
