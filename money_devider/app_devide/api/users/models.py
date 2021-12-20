from django.db import models
from django.contrib.auth.models import User

MAX_LENGTH = 100
''' 
class User(models.Model):
    user_id = models.AutoField(primary_key=True, db_index=True) 
    name = models.CharField(max_length = MAX_LENGTH)
    surname = models.CharField(max_length = MAX_LENGTH)
    email = models.CharField(max_length = MAX_LENGTH,
        unique = True, null=False)
    login = models.CharField(max_length = MAX_LENGTH, unique = True, null=False)
    #user = models.OneToOneField(user)

    def __str__(self):
        return f'user_id: {self.user_id}) name: {self.name} surname: {self.surname}'
'''

class Profile(models.Model):
    user_id = models.AutoField(primary_key=True, db_index=True) 
    name = models.CharField(max_length = MAX_LENGTH)
    surname = models.CharField(max_length = MAX_LENGTH)
    email = models.CharField(max_length = MAX_LENGTH,
        unique = True, null=False)
    login = models.CharField(max_length = MAX_LENGTH, unique = True, null=False)
    #user = models.OneToOneField(User, on_delete = models.CASCADE)

    def __str__(self):
        return f'user_id: {self.user_id}) name: {self.name} surname: {self.surname}'