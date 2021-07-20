from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import User
from .serializers import UserSerializer


class UserViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = UserSerializer
    queryset = User.objects.all()
