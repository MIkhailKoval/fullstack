from django.db import models

MAX_LENGTH = 20

class Group(models.Model):
    group_id = models.AutoField(primary_key=True, db_index=True)
    group_name = models.CharField(max_length=MAX_LENGTH, null = False)
    description = models.TextField()

    def __str__(self):
        return f'group_id: {self.group_id}) group_name: {self.group_name}'
