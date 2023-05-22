from django.shortcuts import render
from .models import Expense
from ..models import UserDebt, UserExpense
from rest_framework import generics
from .serializers import ExpenseSerializer 
from ..users.models import Profile
from ..users.views import ProfileGet
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from ..users.serializers import ProfileSerializer
from django.http import HttpResponse

class CreateExpense(APIView):
    def get_group_participants(group_id):
        pass
    def post(self, request):
        print(request.data['type'])
        if request.data['type'] == 'payment':
            return self.payment(request)
        else:
            return self.expense(request)
    def expense(self, request):
        author_login = request.data['author_login']
        group_id = request.data['group_id']
        if not request.data['devide_equally']:
            participants_logins = request.data['participants_logins']
        else:
            participants_logins = get_group_participants(group_id)
        count = int(request.data['count'])
        description = request.data['description']

        participants_logins = set(participants_logins)
        try:
            author_id = Profile.objects.get(login=author_login).user_id
            user_ids = Profile.objects.filter(login__in = participants_logins).values_list('user_id', flat=True)
            if len(user_ids) != len(participants_logins):
                raise ObjectDoesNotExist('user doesn\'t exist')
        except Exception as e:
            return HttpResponse(status=400, content='user doesn\'t exist')

        if author_login in participants_logins:
            participants_logins.remove(author_login)
        participants_logins = list(participants_logins)
        expense = Expense.objects.create(
            group_id=group_id,
            description=description,
            count=count,
            type='EXP'
        )

        author_id = Profile.objects.get(login=author_login).user_id

        user_ids = Profile.objects.filter(login__in = participants_logins).values_list('user_id', flat=True)
        UserExpense.objects.create(
            user_id = author_id,
            expense_id = expense.expense_id
        )
        for user_id in user_ids:
            UserDebt.objects.create(
                expense_id = expense.expense_id,
                user_id = user_id
            )
        return Response('expense created!')

    def payment(self, request):
        author_login = request.data['author_login']
        group_id = request.data['group_id']
        count = int(request.data['count'])

        participants_login = request.data['participants_logins']
        print(participants_login)
        try:
            author_id = Profile.objects.get(login=author_login).user_id
            user_id = Profile.objects.get(login = participants_login).user_id
            print(author_id)
            print(user_id)
        except Exception as e:
            return HttpResponse(status=400, content='user doesn\'t exist')

        expense = Expense.objects.create(
            group_id=group_id,
            description='расчёт',
            count=count,
            type='PAY',
        )
        UserExpense.objects.create(
            user_id = author_id,
            expense_id = expense.expense_id
        )
        UserDebt.objects.create(
            expense_id = expense.expense_id,
            user_id = user_id
        )
        return Response('expense created!')        

    
class PayExpense(generics.ListAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

class RemoveExpense(generics.DestroyAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

class GetGroupExpenses(APIView):
    def get(self, request, group_id):
        queryset = Expense.objects.filter(group_id=group_id).order_by('-date')
        serializer = ExpenseSerializer(queryset, many=True)
        return Response(serializer.data)

class GetGroupExpensesFullInfo(APIView):
    def get(self, request, group_id):
        response = GetGroupExpenses().get({}, group_id)
        for expense in response.data:
            expense_id = expense['expense_id']
            # get author
            author_id = UserExpense.objects.get(expense_id = expense_id).user_id
            author = Profile.objects.get(user_id = author_id)
            # get debtors
            debtors_ids = UserDebt.objects.filter(expense_id = expense_id).values_list("user_id", flat=True)
            debtors = Profile.objects.filter(user_id__in=debtors_ids)
            expense['author'] = ProfileSerializer(author).data
            expense['debtors'] = ProfileSerializer(debtors, many=True).data
            expense['date'] = {'day': 30, 'month': 'nov'}
        return response

# добавить проверку, что пользователи из одной группы
# добавить кейс, когда для всей группы платёж