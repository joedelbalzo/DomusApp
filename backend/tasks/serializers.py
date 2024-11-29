from rest_framework import serializers
from .models import Task
from users.serializers import UserSerializer
from properties.serializers import PropertySerializer

class TaskSerializer(serializers.ModelSerializer):
    property = PropertySerializer(read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'property', 'due_date', 'youtube_url']
