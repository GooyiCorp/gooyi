from django.contrib import admin
from django.contrib.gis import admin as geoAdmin
from .models import *
# Register your models here.

admin.site.register(User)
admin.site.register(UserVersuche)
geoAdmin.site.register(Store, geoAdmin.OSMGeoAdmin)