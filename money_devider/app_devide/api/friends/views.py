from django.shortcuts import render
from .models import Friend
from rest_framework import generics
from .serializers import FriendSerializer 
from ..users.serializers import ProfileSerializer
from ..users.models import Profile
from ..users.views import ProfileGet
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import BadRequest

class AddFriend(APIView):
    def post(self, request):  
        user_login = request.data['user_login']
        friend_login = request.data['friend_login']
        user = Profile.objects.get(login = user_login)
        friend = Profile.objects.get(login = friend_login)

        if user_login == friend_login:
            raise BadRequest('same friend_login and user_login')
        queryset = Friend.objects.create(
            user_id=user.user_id,
            friend_id=friend.user_id,
        )
        return Response(ProfileSerializer(friend).data)

class DeleteFriend(generics.DestroyAPIView):
    serializer_class = FriendSerializer
    queryset = Friend.objects.all()

class GetFriends(generics.ListAPIView):
    queryset = Friend.objects.all()
    def list(self, request, friend_login):
        friend_id = Profile.objects.get(login=friend_login).user_id
        queryset_friend = Friend.objects.filter(user_id=friend_id)
        serializer = FriendSerializer(queryset_friend, many=True)
        user_ids = [item['friend_id'] for item in serializer.data]
        queryset = Profile.objects.filter(user_id__in=user_ids)
        serializer = ProfileSerializer(queryset, many=True)
        return Response(serializer.data)
