from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .forms import CustomUserCreationForm
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, logout
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = None  # We'll handle manually for simplicity in this first part
    
    def post(self, request, *args, **kwargs):
        form = CustomUserCreationForm(request.data)
        if form.is_valid():
            user = form.save()
            # Email verification will be handled by allauth automatically
            return Response({'message': 'User registered successfully. Please verify your email.'}, status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        from django.contrib.auth import authenticate
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Logged in successfully.'}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        user = request.user
        return Response({
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_verified': user.is_active,  # simplified
        })
