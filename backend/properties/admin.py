from django.contrib import admin
from .models import Property

# Register your models here.
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
  list_display = ("name", "description")
  search_fields = ("name", "description")
  filter_horizontal = ("owners",)