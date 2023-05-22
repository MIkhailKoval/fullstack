from django.db import models
from .users.models import User
from .expense.models import Expense
MAX_LENGTH = 40

class GroupUser(models.Model):
    group_id = models.IntegerField(null=False)
    user_id = models.IntegerField(null=False)
    
    def __str__(self):
        return f'user_id: {self.user_id}) group_id: {self.group_id}'
    class Meta:
        unique_together = [('group_id', 'user_id')]

class UserExpense(models.Model):
    expense_id = models.IntegerField(null=False)
    user_id = models.IntegerField(null=False)

    def __str__(self):
        return f'user_id: {self.user_id}) expense_id: {self.expense_id}'
    class Meta:
        unique_together = [('expense_id', 'user_id')]

class UserDebt(models.Model):
    expense_id = models.IntegerField(null=False)
    user_id = models.IntegerField(null=False)

    def __str__(self):
        return f'user_id: {self.user_id}) debt_id: {self.expense_id}'
    class Meta:
        unique_together = [('expense_id', 'user_id')]