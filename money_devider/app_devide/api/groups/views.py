from django.shortcuts import render
from .models import Group
from ..users.models import Profile
from rest_framework import generics
from .serializers import GroupSerializer
from ..users.serializers import ProfileSerializer
from ..serializers import GroupUserSerializer
from ..models import GroupUser
from rest_framework.response import Response
from rest_framework.views import APIView

class GroupGet(APIView):
    def get(self, request, group_id):
        queryset = Group.objects.get(group_id=group_id)
        serializer = GroupSerializer(queryset)
        return Response(serializer.data)

class GroupCreate(APIView):
    def post(self, request):
        group_name = request.data['group_name']
        description = (request.data['description'] if 'description' in request.data else None)
        queryset = Group.objects.create(
            group_name=group_name,
            description=description
        )
        print(queryset.group_id)
        return Response({
            'group_id': queryset.group_id,
        })
  
class GroupDelete(generics.DestroyAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

class GroupList(APIView):
    def get(self, request, user_login):
        user_id = Profile.objects.get(login = user_login).user_id
        queryset = GroupUser.objects.filter(user_id = user_id)
        group_ids = [user_groups.group_id for user_groups in queryset]
        groups = Group.objects.filter(group_id__in=group_ids)
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

class GroupAddUser(APIView):
    def post(self, request, group_id):
        user_login = request.data['user_login']
        user = Profile.objects.get(login=user_login)
        queryset = GroupUser.objects.create(user_id=user.user_id, group_id=group_id)
        return Response(f'User {user_login} added')

class GroupDeleteUser(APIView):
    def delete(self, request, group_id):
        user_id = request.data['user_id']
        user = GroupUser.objects.get(user_id=user_id, group_id=group_id)
        user.delete()
        return Response(f'Group {group_id} deleted')

class GetGroupParticipants(APIView):
    def get(self, request, group_id):
        queryset_user_groups = GroupUser.objects.filter(group_id=group_id)
        user_ids = [user_groups.user_id for user_groups in queryset_user_groups]
        queryset = Profile.objects.filter(user_id__in=user_ids)
        serializer = ProfileSerializer(queryset, many=True)
        return Response(serializer.data)