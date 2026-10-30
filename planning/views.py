from rest_framework import viewsets, permissions
from .models import Quarter, Goal
from .serializers import QuarterSerializer, GoalSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from rest_framework.response import Response

User = get_user_model()

class QuarterViewSet(viewsets.ModelViewSet):
    serializer_class = QuarterSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Quarter.objects.none()  # Required for router basename
    
    def get_queryset(self):
        # Filter by user and optionally by timezone (Tehran time base)
        return Quarter.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Goal.objects.none()  # Required for router basename
    
    def get_queryset(self):
        return Goal.objects.filter(quarter__user=self.request.user)
    
    def perform_create(self, serializer):
        # Ensure the quarter belongs to the user
        quarter = serializer.validated_data['quarter']
        if quarter.user != self.request.user:
            raise PermissionError("Quarter does not belong to the user")
        serializer.save()
