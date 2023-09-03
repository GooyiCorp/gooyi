from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.core import serializers
from gutcheinapp.utils.response import *
from gutcheinapp.models import *
from django.contrib.gis.measure import Distance

@api_view(['GET'])
def near_store(request):
    distance = request.data['distance']
    longitude = request.data['longtitude']
    latitude = request.data['latitude']
    print(distance, longitude, latitude)
    stores = Store.objects.filter(location__distance_lt=(
        Point((latitude,longitude)),
        Distance(m=distance)
    ))
    data = []
    for store in stores:
        data.append(store.name)
    return sendSuccess("ok",data)
