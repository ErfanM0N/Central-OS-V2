from rest_framework import serializers
from .models import Quarter, Goal
from django.contrib.auth import get_user_model

User = get_user_model()

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'title', 'description', 'is_completed', 'priority', 'created_at', 'updated_at']

class QuarterSerializer(serializers.ModelSerializer):
    goals = GoalSerializer(many=True, read_only=True)
    
    class Meta:
        model = Quarter
        fields = ['id', 'year', 'quarter', 'created_at', 'updated_at', 'goals']
