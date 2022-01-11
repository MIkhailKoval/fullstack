from django.contrib import admin
from .api.friends.models import Friend
from .api.groups.models import Group
from .api.expense.models import Expense
from .api.users.models import Profile
from .api.models import GroupUser, UserExpense, UserDebt

admin.site.register(Friend)
admin.site.register(Group)
admin.site.register(Expense)
admin.site.register(GroupUser)
admin.site.register(UserExpense)
admin.site.register(UserDebt)
admin.site.register(Profile)