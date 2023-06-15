from rest_framework.decorators import api_view
from django.http import JsonResponse
from gutcheinapp.serializers import UserSerializer
from gutcheinapp.models import User
import json

@api_view(['GET'])
def user(request):
    
    data = request.data
    
    return JsonResponse({"message":"ok", 'data':data})