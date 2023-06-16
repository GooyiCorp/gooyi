from rest_framework.decorators import api_view
from django.http import JsonResponse
from gutcheinapp.serializers import UserSerializer
from gutcheinapp.models import User

@api_view(['POST'])
def user(request):
    
    if request.method == 'POST':
        data = request.data
        email = data['email']
        password = data['password']
        try:
            user = User.objects.get(email=email, password=password)
            return JsonResponse({"success": True, 'message': 'Login successfully'})
        except User.DoesNotExist:
            return JsonResponse({'success': False,'message': 'email or password is incorrect'})