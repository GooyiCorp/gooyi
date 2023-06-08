from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.response import JSONResponse

from .models import User
from .serializers import UserSerializer
# Create your views here.

@csrf_exempt
def user(request, id=0):
    if request.method == 'POST':
            data = JSONParser().parse(request)
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JSONResponse(serializer.data, status=201)
            return JSONResponse(serializer.errors, status=400)
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JSONResponse(serializer.data, safe=False)
    
    if request.method == 'PUT':
        user = JSONParser().parse(request)
        user = User.objects.get(id=user['user_id'])
        serializer = UserSerializer(user, data=user)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
    if request.method == 'DELETE':
        user = User.objects.get(id=id)
        user.delete()
        return JSONResponse(status=204)
    return JSONResponse({'message': 'Method Not Allowed'}, status=405)