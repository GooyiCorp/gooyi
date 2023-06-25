from rest_framework.decorators import api_view
from django.http import JsonResponse
from gutcheinapp.utils.response import *
from gutcheinapp.serializers import UserSerializer
from gutcheinapp.models import User, UserVersuche

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
        user_versuche = UserVersuche.objects.get(user=user)
        if user_versuche.versucher == 0: raise Exception
        if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return sendSuccess("Login successfully")
        else:
            raise Exception
    except User.DoesNotExist:
        return sendError("email", {"message": "Email does not exist"})
    except Exception:
        if user_versuche.versucher == 0:
            return sendError("OutOfTries", {"message": "No more tries"})
        elif password == '':
            return sendError(None, {"message": "Password fehlt"})
        user_versuche.versucher -= 1
        user_versuche.save()
        if user_versuche.versucher == 0:
            user.active = False
            user.save()
            return sendError("OutOfTries", {"message": "No more tries"})
        return sendError("password", {"message": "Wrong password", "tries_left": user_versuche.versucher})
@api_view(['POST'])
def register(request):
    email = request.data['email']
    last_name = request.data['last_name']
    first_name = request.data['first_name']
    password = request.data['password']
    try:
        user = User.objects.get(email=email)
        if user.verified is False:
            otp = OTP_generator()   
             # Email contents
            subject = 'Authentication'
            body = 'Sehrgeehter Damen und Herren, OTP is ' + (otp)
            from_email = 'Gooyi <noreply@gmail.com>'
            to_email = [email]
            
            # Send email
            email_send = EmailMessage(subject, body, from_email, to_email)
            email_send.send()
        
            # Store OTP
            cache_key = f'otp:{email}'
            cache.set(cache_key, otp, timeout=300)
            
            # Update user
            user.first_name = first_name
            user.last_name = last_name
            hash_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            user.password = hash_password.decode('utf-8')
            user.save()
            return sendSuccess("Email sent successfully")
        else: return sendError("Die eingegebene E-Mail-Addresse existiert")
    except User.DoesNotExist:
        otp = OTP_generator()   
        # Email contents
        subject = 'Authentication'
        body = 'Sehrgeehter Damen und Herren, OTP is ' + (otp)
        from_email = 'Gooyi <noreply@gmail.com>'
        to_email = [email]
        
        # Send email
        email_send = EmailMessage(subject, body, from_email, to_email)
        email_send.send()
    
        # Store OTP
        cache_key = f'otp:{email}'
        cache.set(cache_key, otp, timeout=300)
        
        hash_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = User(first_name=first_name, last_name=last_name,email=email,password=hash_password.decode('utf-8'),verified=False)
        user.save()
    return sendSuccess("Email sent successfully")

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
            user.active = True
            user.save()
            user_versuche = UserVersuche(user=user)
            user_versuche.save()
            return JsonResponse({"success": True, 'message': 'Email successfully verified'})
        else:
            return JsonResponse({"success": False, 'message': 'OTP was wrong'})
    else:
        return JsonResponse({'success': False, 'message': 'OTP expired'})
    
    
@api_view(['PUT', 'POST'])
def password_vergessen(request):
    email = request.data['email']

    if request.method == 'POST':
        otp = OTP_generator()
        subject = "Password Recovery"
        body = 'Sehrgeehter Damen und Herren, OTP is ' + (otp)
        from_email = 'Gooyi <noreply@gmail.com>'
        to_email = [email]
        
        # Send email
        email_send = EmailMessage(subject, body, from_email, to_email)
        email_send.send()
    
        # Store OTP
        cache_key = f'otp:{email}'
        cache.set(cache_key, otp, timeout=300)
        return sendSuccess("Email sent successfully")
        
        
    
    if request.method == 'PUT':
        otp = request.data['otp']
        password = request.data['password']
        
        cache_key = f'otp:{email}'
        stored_otp = cache.get(cache_key)
        
        if stored_otp:
            if otp == stored_otp:
                user = User.objects.get(email=email)
                hash_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                user.password = hash_password.decode('utf-8')
                user.save()
                return JsonResponse({"success": True, 'message': 'Email successfully verified'})
            else:
                return JsonResponse({"success": False, 'message': 'OTP was wrong'})
        else:
            return JsonResponse({'success': False, 'message': 'OTP expired'})
    
        
        
        
        
                