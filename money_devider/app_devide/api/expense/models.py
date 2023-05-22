from django.db import models
from django.utils.translation import gettext_lazy as _
MAX_LENGTH = 20
from django.utils import timezone

class Expense(models.Model):
    class ExpenseType(models.TextChoices):
        PAYMENT = 'PAY', _('Payment')
        EXPENSE = 'EXP', _('Expense')

    expense_id = models.AutoField(primary_key=True, db_index=True)
    group_id = models.IntegerField()
    description = models.TextField(null = False)
    count = models.FloatField()
    date = models.DateTimeField(default = timezone.now)
    type = models.CharField(
        max_length = 3, 
        choices = ExpenseType.choices,
        default = ExpenseType.EXPENSE,
    )
    def __str__(self):
        return f' description: {self.description} count: {self.count}'

