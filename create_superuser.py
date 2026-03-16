import os
import sys
import django

sys.path.insert(0, r'c:\Users\menat\OneDrive\Desktop\QUIZ 6\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from users.models import CustomUser

try:
    CustomUser.objects.create_superuser(
        email='admin@flooring.com',
        password='admin123',
        username='admin',
        first_name='Admin',
        last_name='User'
    )
    print("Superuser created successfully!")
except Exception as e:
    print(f"Error: {e}")
