#!/usr/bin/env python
"""
Create sample flooring services in the database
Run with: python create_services.py
"""
import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from services.models import Service
from users.models import CustomUser

print("Creating flooring services...")

# Get or create a seller user
seller, created = CustomUser.objects.get_or_create(
    email='seller1@flooring.com',
    defaults={
        'username': 'seller1',
        'first_name': 'Marco',
        'last_name': 'Santos',
        'role': 'Seller'
    }
)

if created:
    seller.set_password('seller123')
    seller.save()
    print(f"✓ Created seller: {seller.email}")
else:
    print(f"✓ Using existing seller: {seller.email}")

# Create the 6 services
services_data = [
    {
        'service_name': 'Tile Floor Installation',
        'description': 'Professional tile installation for kitchens and bathrooms. We use high-quality tiles and expert techniques.',
        'price': 2500,
        'duration_of_service': '2-3 days'
    },
    {
        'service_name': 'Hardwood Floor Polishing',
        'description': 'Restore the shine of your hardwood floors with our expert polishing service. Makes floors look brand new.',
        'price': 1800,
        'duration_of_service': '1-2 days'
    },
    {
        'service_name': 'Vinyl Flooring Installation',
        'description': 'Durable and affordable vinyl flooring perfect for any room. Waterproof and easy to maintain.',
        'price': 1500,
        'duration_of_service': '1 day'
    },
    {
        'service_name': 'Epoxy Floor Coating',
        'description': 'Protective and decorative epoxy coating for garages and basements. Lasts for years.',
        'price': 3200,
        'duration_of_service': '2 days'
    },
    {
        'service_name': 'Laminate Floor Repair',
        'description': 'Fix damaged laminate flooring. We handle scratches, dents, and replacement of damaged planks.',
        'price': 1200,
        'duration_of_service': '4-6 hours'
    },
    {
        'service_name': 'Grout Cleaning Service',
        'description': 'Deep clean grout lines between tiles. Removes mold, mildew, and stains.',
        'price': 800,
        'duration_of_service': '3-4 hours'
    },
]

created_count = 0
for data in services_data:
    service, created = Service.objects.get_or_create(
        service_name=data['service_name'],
        seller=seller,
        defaults={
            'description': data['description'],
            'price': data['price'],
            'duration_of_service': data['duration_of_service']
        }
    )
    
    if created:
        print(f"✓ Created: {service.service_name} (₱{service.price})")
        created_count += 1
    else:
        print(f"→ Already exists: {service.service_name}")

print(f"\n✅ Done! Created {created_count} new services.")
print(f"Total services in database: {Service.objects.count()}")
