from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'quarters', views.QuarterViewSet)
router.register(r'goals', views.GoalViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
