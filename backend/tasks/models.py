from django.db import models
from django.contrib.auth.models import User
from properties.models import Property
from django.core.exceptions import ValidationError
from django.utils.timezone import now
from datetime import timedelta
from dateutil.relativedelta import relativedelta
import re

def validate_youtube_url(value):
    youtube_regex = r'(https?://)?(www\.)?(youtube\.com|youtu\.be)/.+'
    if not re.match(youtube_regex, value):
        raise ValidationError(f"{value} is not a valid YouTube URL.")

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="tasks", null=True, blank=True)
    due_date = models.DateField(default="1970-01-01")
    previously_done = models.DateField(null=True, blank=True)
    done = models.BooleanField(default=False)
    frequency_value = models.IntegerField(default=1)
    FREQUENCY_UNITS = [
        ("days", "Days"),
        ("weeks", "Weeks"),
        ("months", "Months"),
        ("years", "Years"),
    ]
    frequency_unit = models.CharField(max_length=10, choices=FREQUENCY_UNITS, default="months")
    TASK_CATEGORIES = [
        ("interior", "Interior"),
        ("exterior", "Exterior"),
    ]
    task_category = models.CharField(max_length=10, choices=TASK_CATEGORIES, default="Exterior")
    youtube_url = models.URLField(blank=True, null=True, validators=[validate_youtube_url])
    typical_cost = models.IntegerField(default=0)
    follow_up = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL, related_name="followed_by")
    suggested_follow_ups = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='suggested_for')
    completion_history = models.JSONField(default=list)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Automatically calculate the due_date if it's not set
        if not self.due_date:
            if self.frequency_unit == "days":
                self.due_date = now().date() + timedelta(days=self.frequency_value)
            elif self.frequency_unit == "weeks":
                self.due_date = now().date() + timedelta(weeks=self.frequency_value)
            elif self.frequency_unit == "months":
                self.due_date = now().date() + relativedelta(months=self.frequency_value)
            elif self.frequency_unit == "years":
                self.due_date = now().date() + relativedelta(years=self.frequency_value)
        super().save(*args, **kwargs)

    def update_due_date(self):
        if self.done:
            if self.frequency_unit == "days":
                self.due_date += timedelta(days=self.frequency_value)
            elif self.frequency_unit == "weeks":
                self.due_date += timedelta(weeks=self.frequency_value)
            elif self.frequency_unit == "months":
                self.due_date += relativedelta(months=self.frequency_value)
            elif self.frequency_unit == "years":
                self.due_date += relativedelta(years=self.frequency_value)
            self.previously_done = now().date()  # Ensure last done date is captured
        self.done = False
        self.save()

    def create_follow_up(self):
        if self.follow_up:
            follow_up_task = Task.objects.filter(id=self.follow_up.id).first()
            if follow_up_task:
                follow_up_task.due_date = self.due_date + relativedelta(
                    months=follow_up_task.frequency_value
                )
                follow_up_task.save()
            return follow_up_task

    def mark_complete(self):
        self.completion_history.append({
            "date": str(self.previously_done),
            "cost": self.typical_cost,
        })
        self.done = True
        self.previously_done = now().date()
        self.save()
