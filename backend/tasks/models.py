from django.db import models
from django.contrib.auth.models import User
from properties.models import Property

# Create your models here.
class Task(models.Model):
  title=models.CharField(max_length=100)
  description=models.TextField()
  property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="tasks")
  due_date= models.DateField()
  youtube_url = models.URLField(blank=True, null=True)

  def __str__(self):
    return self.title
