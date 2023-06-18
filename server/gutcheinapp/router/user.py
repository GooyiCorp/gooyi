from rest_framework.decorators import api_view
from django.http import JsonResponse
from gutcheinapp.serializers import UserSerializer
from gutcheinapp.models import User

from django.core.mail import EmailMessage
from gutcheinapp.utils.opt import OTP_generator
from django.core.cache import cache
import bcrypt
@api_view(['POST'])
def login(request):
    data = request.data
    email = data['email']
    password = data['password']
    try:
        user = User.objects.get(email=email)
        if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return JsonResponse({"success": True, 'message': 'Login successfully'})
        else:
            raise Exception('Wrong password')
    except User.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'email'})
    except Exception:
        return JsonResponse({'success': False, 'error': 'password'})
@api_view(['POST'])
def register(request):
    email = request.data['email']
    otp = OTP_generator()
    
    subject = 'Authentication'
    body = 'Sehrgeehter Damen und Herren, OTP is ' + (otp)
    from_email = 'Gooyi <noreply@gmail.com>'
    to_email = [email]
    
    email_send = EmailMessage(subject, body, from_email, to_email)
    email_send.send()
    
    cache_key = f'otp:{email}'
    cache.set(cache_key, otp, timeout=300)
    
    
    last_name = request.data['last_name']
    first_name = request.data['first_name']
    password = request.data['password']
    hash_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    try:
        user = User.objects.get(email=email)
        user.first_name = first_name
        user.last_name = last_name
        user.password = hash_password.decode('utf-8')
        user.save()
    except User.DoesNotExist:
        user = User(first_name=first_name, last_name=last_name,email=email,password=hash_password.decode('utf-8'),verified=False)
        user.save()
        print('User saved')
    return JsonResponse({"success": True, 'message': 'email sent'})

@api_view(['POST'])
def email_verification(request):
    email = request.data['email']
    otp = request.data['otp']
    
    cache_key = f'otp:{email}'
    stored_otp = cache.get(cache_key)
    if stored_otp:
        if otp == stored_otp:
            user = User.objects.get(email=email)
            user.verified = True
            user.save()
            return JsonResponse({"success": True, 'message': 'Email successfully verified'})
        else:
            return JsonResponse({"success": False, 'message': 'OTP was wrong'})
    else:
        return JsonResponse({'success': False, 'message': 'OTP expired'})