"""money_divider_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .api.users.views import ProfileCreate, ProfileGet
from .api.friends.views import GetFriends, AddFriend
from .api.groups.views import GetGroupParticipants, GroupAddUser, GroupCreate, GroupDeleteUser, GroupList, GroupGet
from .api.expense.views import PayExpense, CreateExpense, RemoveExpense, GetGroupExpenses, GetGroupExpensesFullInfo

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # users functions
    
    path('user/create', ProfileCreate.as_view(), name='create_user'),
    path('user/get/<slug:login>', ProfileGet.as_view(), name='get_user'),
    path('user/<int:id>', ProfileGet.as_view(), name='user_get'),
    path('user/<slug:user_login>/get_groups', GroupList.as_view(), name='get_groups_by_user'),
    # friends functions
    path('friends/list/<slug:friend_login>', GetFriends.as_view(), name='friends_list'),
    path('add/friend', AddFriend.as_view(), name='add_friend'),
    # groups functions
    path('group/<int:group_id>/get', GroupGet.as_view(), name = 'get_group'),
    path('group/<int:group_id>/participants', GetGroupParticipants.as_view(), name='group_participants'),
    path('group/<int:group_id>/add/user', GroupAddUser.as_view(), name='add_user'),
    path('group/create/', GroupCreate.as_view(), name='create_group'),
    path('group/<int:group_id>/delete/user', GroupDeleteUser.as_view(), name='exclude_user'),
    path('group/<int:group_id>/get_expenses/', GetGroupExpenses.as_view(), name='get_group_expenses'),
    path('group/<int:group_id>/get_expenses/full', GetGroupExpensesFullInfo.as_view(), name='get_full_info'),
    # expenses functions
    path('expense/create', CreateExpense.as_view(), name='create_expense'),
    path('expense/pay', PayExpense.as_view(), name='pay_expense'),
    path('expense/delete', RemoveExpense.as_view(), name='remove_expense'),
    # auth
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
