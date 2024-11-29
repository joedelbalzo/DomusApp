from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Property(models.Model):
  name = models.CharField(max_length=100)
  description = models.CharField(max_length=255)
  owners = models.ManyToManyField(User, related_name="properties")

  def __str__(self):
    return f"{self.name} - {self.description}"
  
  class Meta:
    verbose_name_plural = "Properties"