from django.shortcuts import render
from .models import Profile
from ..models import GroupUser
from rest_framework import generics
from .serializers import ProfileSerializer
from ..serializers import UserExpenseSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

'''
class UserCreate(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
'''
class ProfileCreate(APIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


class ProfileGet(generics.ListAPIView):
    def get(self, request, login):
        queryset = Profile.objects.get(login=login)
        serializer = ProfileSerializer(queryset)
        return Response(serializer.data)
