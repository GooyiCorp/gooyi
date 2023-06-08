from rest_framework.serializers import ModelSerializer
from gutcheinapp.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'first_name','last_name', 'email', 'password','verified')