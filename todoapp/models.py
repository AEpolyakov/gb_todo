from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64, unique=True)
    href = models.URLField(max_length=128, blank=True)
    users = models.ManyToManyField(User)


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField()






# Create your models here.
