from rest_framework import serializers
from properties.models import Property
from users.serializers import UserSerializer

class PropertySerializer(serializers.ModelSerializer):
    owners = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = ['id', 'name', 'description', 'owners']