from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.


class User(models.Model):
    userid = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=255)
    verified = models.BooleanField(default=False)
    active = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.first_name + ' ' + self.last_name
class UserVersuche(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    versucher = models.IntegerField(default=3,null=False,validators=[
            MinValueValidator(0),
            MaxValueValidator(3),
        ])
    def __str__(self) -> str:
        return self.user.first_name + ' ' + self.user.last_name