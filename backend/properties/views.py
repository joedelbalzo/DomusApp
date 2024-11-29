from django.shortcuts import render
from rest_framework import viewsets, permissions

from .models import Property
from .serializers import PropertySerializer

# Create your views here.
class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.AllowAny]
