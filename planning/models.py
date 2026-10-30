from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Quarter(models.Model):
    YEAR_CHOICES = [(y, str(y)) for y in range(2020, 2050)]
    QUARTER_CHOICES = [
        (1, 'Q1 (Jan-Mar)'),
        (2, 'Q2 (Apr-Jun)'),
        (3, 'Q3 (Jul-Sep)'),
        (4, 'Q4 (Oct-Dec)'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quarters')
    year = models.IntegerField(choices=YEAR_CHOICES)
    quarter = models.IntegerField(choices=QUARTER_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    timezone = models.CharField(max_length=50, default='Asia/Tehran')  # Base time

    class Meta:
        unique_together = ('user', 'year', 'quarter')

    def __str__(self):
        return f"{self.user.email} - {self.year} Q{self.quarter} ({self.timezone})"

class Goal(models.Model):
    quarter = models.ForeignKey(Quarter, on_delete=models.CASCADE, related_name='goals')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    link_files = models.JSONField(default=list, blank=True, null=True)  # Store file links/paths
    other_details = models.JSONField(default=dict, blank=True, null=True)  # Flexible extra fields
    is_completed = models.BooleanField(default=False)
    priority = models.IntegerField(default=1)  # 1: High, 2: Medium, 3: Low
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.quarter})"
