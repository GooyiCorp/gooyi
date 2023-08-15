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
class InactivityUser(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
class UserVersuche(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    versucher = models.IntegerField(default=3,null=False,validators=[
            MinValueValidator(0),
            MaxValueValidator(3),
        ])
    def __str__(self) -> str:
        return self.user.first_name + ' ' + self.user.last_name
class BannedEmail(models.Model):
    email = models.TextField(primary_key=True)

# Store
class Store(models.Model):
    store_id = models.AutoField(primary_key=True)
    name = models.TextField()
    address = models.TextField()
    opening_hour = models.TextField()
    active = models.BooleanField(default=False)
    description = models.TextField()
    average_rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    
class FavoriteStore(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    
class UserStorePoint(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    point = models.IntegerField()
# Coupon
class Coupon(models.Model):
    coupon_id = models.AutoField(primary_key=True)
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    value = models.FloatField()
    active = models.BooleanField(default=False)
    expired = models.DateField()
    type = models.CharField(max_length=10, choices=[("sold", "Sold"), ("rewarded", "Rewarded")])

class SoldCoupon(models.Model):
    coupon_id = models.OneToOneField(Coupon, on_delete=models.CASCADE)

class RewardedCoupon(models.Model):
    coupon_id = models.OneToOneField(Coupon, on_delete=models.CASCADE)

class CouponUser(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    coupon_id = models.ForeignKey(Coupon, on_delete=models.CASCADE)
class CouponBookmark(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    coupon_id = models.ForeignKey(Coupon, on_delete=models.CASCADE)
    time = models.DateField()

class Gift(models.Model):
    gift_id = models.AutoField(primary_key=True)
    title = models.TextField()
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    level = models.IntegerField()
    condition = models.IntegerField()
    unlocked = models.BooleanField()
    achieved = models.BooleanField()
    received = models.BooleanField()
    redeemed = models.BooleanField()

class Message(models.Model):
    message_id = models.IntegerField(primary_key=True)
    title = models.TextField()
    detail = models.TextField()
    type = models.CharField(max_length=10, choices=[("system", "System"), ("other", "Other")])

class MessageUser(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    message_id = models.ForeignKey(Message, on_delete=models.CASCADE)

class Payment(models.Model):
    payment_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    status = models.TextField()
    amount = models.FloatField()
    method = models.CharField(max_length=15, choices=[("credit_card", "Credit Card"), ("bank_account", "Bank Account"), ("paypal", "PayPal")])

class Rating(models.Model):
    rating_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    star = models.IntegerField(validators=(MaxValueValidator(5), MinValueValidator(1)))
    comment = models.TextField()
