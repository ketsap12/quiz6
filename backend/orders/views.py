from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from orders.models import Order
from .serializers import OrderSerializer
from .paypal_service import PayPalService
from services.models import Service
import logging

logger = logging.getLogger(__name__)


class CreatePaymentView(APIView):
    """Create PayPal payment for a service"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """
        Create a PayPal payment
        Request body: {
            "service_id": 1,
            "return_url": "http://localhost:3000/order-success",
            "cancel_url": "http://localhost:3000/order-cancelled"
        }
        """
        try:
            service_id = request.data.get('service_id')
            
            if not service_id:
                return Response(
                    {'error': 'service_id is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            try:
                service = Service.objects.get(id=service_id)
            except Service.DoesNotExist:
                return Response(
                    {'error': 'Service not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            return_url = request.data.get('return_url', 'http://localhost:3000/order-success')
            cancel_url = request.data.get('cancel_url', 'http://localhost:3000/order-cancelled')
            
            # Log PayPal configuration
            logger.info(f"Creating payment with mode: {settings.PAYPAL_MODE}")
            logger.info(f"Client ID: {settings.PAYPAL_CLIENT_ID}")
            
            payment, error_msg = PayPalService.create_payment(
                service_id=service.id,
                service_name=service.service_name,
                price=float(service.price),
                return_url=return_url,
                cancel_url=cancel_url
            )
            
            if payment:
                # Get approval link
                approval_url = None
                for link in payment.links:
                    if link.rel == 'approval_url':
                        approval_url = link.href
                        break
                
                return Response({
                    'success': True,
                    'payment_id': payment.id,
                    'approval_url': approval_url,
                    'service_id': service.id,
                    'service_name': service.service_name,
                    'price': float(service.price)
                }, status=status.HTTP_200_OK)
            else:
                logger.error(f"Payment creation failed: {error_msg}")
                return Response(
                    {'error': f'Failed to create payment: {error_msg}'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            logger.error(f"Create payment error: {str(e)}", exc_info=True)
            return Response(
                {'error': f'Error: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )


class ExecutePaymentView(APIView):
    """Execute PayPal payment after user approval"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """
        Execute a PayPal payment
        Request body: {
            "payment_id": "PAYID-XXX",
            "payer_id": "XXXXX",
            "service_id": 1
        }
        """
        try:
            payment_id = request.data.get('payment_id')
            payer_id = request.data.get('payer_id')
            service_id = request.data.get('service_id')
            
            if not all([payment_id, payer_id, service_id]):
                return Response(
                    {'error': 'payment_id, payer_id, and service_id are required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get service
            try:
                service = Service.objects.get(id=service_id)
            except Service.DoesNotExist:
                return Response(
                    {'error': 'Service not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Execute payment
            result = PayPalService.execute_payment(payment_id, payer_id)
            
            if result.get('success'):
                # Create order in database
                order = Order.objects.create(
                    buyer=request.user,
                    service=service,
                    paypal_transaction_id=result.get('transaction_id'),
                    price_paid=float(service.price)
                )
                
                order_serializer = OrderSerializer(order)
                return Response({
                    'success': True,
                    'message': 'Payment executed and order created successfully!',
                    'order': order_serializer.data,
                    'payment_id': payment_id,
                    'transaction_id': result.get('transaction_id')
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    'success': False,
                    'error': result.get('error', 'Payment execution failed')
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Execute payment error: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class CreateOrderView(APIView):
    """Create a new order after PayPal payment"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(buyer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserOrderHistoryView(APIView):
    """Get user's order history"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(buyer=request.user).order_by('-date_purchased')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
