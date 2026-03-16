from rest_framework import serializers
from services.models import Service


class ServiceSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(source='seller.get_full_name', read_only=True)

    class Meta:
        model = Service
        fields = ('id', 'seller', 'seller_name', 'service_name', 'description', 'price', 'duration_of_service', 'sample_image', 'created_at')
        read_only_fields = ('created_at', 'seller')
