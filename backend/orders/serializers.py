from rest_framework import serializers
from orders.models import Order


class OrderSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.service_name', read_only=True)
    buyer_email = serializers.CharField(source='buyer.email', read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'buyer', 'buyer_email', 'service', 'service_name', 'paypal_transaction_id', 'price_paid', 'date_purchased')
        read_only_fields = ('date_purchased', 'buyer')
