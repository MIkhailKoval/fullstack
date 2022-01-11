from django.db import models

MAX_LENGTH = 20

class Friend(models.Model):
    friend_id = models.IntegerField(null=False)
    user_id = models.IntegerField(null=False)

    def __str__(self):
        return f'user_id: {self.user_id}) friend_id: {self.friend_id}'

    class Meta:
        unique_together = [('friend_id', 'user_id')]