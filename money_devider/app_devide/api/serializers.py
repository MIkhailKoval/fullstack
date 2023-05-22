from .models import GroupUser, UserExpense, UserDebt
from rest_framework import serializers

class GroupUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupUser
        fields = '__all__'
       

class UserExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExpense
        fields = '__all__'

class UserDebtSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDebt
        fields = '__all__'  