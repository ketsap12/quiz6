try:
    import paypalrestsdk
except ImportError:
    paypalrestsdk = None

import logging
from django.conf import settings

logger = logging.getLogger(__name__)

# Configure PayPal SDK if available
if paypalrestsdk:
    paypalrestsdk.configure({
        "mode": settings.PAYPAL_MODE,
        "client_id": settings.PAYPAL_CLIENT_ID,
        "client_secret": settings.PAYPAL_CLIENT_SECRET
    })


class PayPalService:
    """Service for handling PayPal payment operations"""

    @staticmethod
    def create_payment(service_id, service_name, price, return_url, cancel_url):
        """
        Create a PayPal payment
        
        Args:
            service_id: ID of the service
            service_name: Name of the service
            price: Price in PHP
            return_url: URL to return after payment
            cancel_url: URL if payment is cancelled
            
        Returns:
            Payment object or None
        """
        if not paypalrestsdk:
            logger.error("PayPal SDK not installed. Install with: pip install paypalrestsdk")
            return None
            
        try:
            payment = paypalrestsdk.Payment({
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": return_url,
                    "cancel_url": cancel_url
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": service_name,
                            "sku": f"service_{service_id}",
                            "price": str(price),
                            "currency": settings.PAYPAL_CURRENCY,
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "total": str(price),
                        "currency": settings.PAYPAL_CURRENCY,
                        "details": {
                            "subtotal": str(price)
                        }
                    },
                    "description": f"Payment for {service_name}"
                }]
            })

            if payment.create():
                logger.info(f"Payment created successfully. ID: {payment.id}")
                return payment
            else:
                logger.error(f"Payment creation failed: {payment.error}")
                return None
        except Exception as e:
            logger.error(f"PayPal payment creation error: {str(e)}")
            return None

    @staticmethod
    def execute_payment(payment_id, payer_id):
        """
        Execute (confirm) a PayPal payment
        
        Args:
            payment_id: PayPal payment ID
            payer_id: PayPal payer ID from approval
            
        Returns:
            Payment object or None
        """
        if not paypalrestsdk:
            logger.error("PayPal SDK not installed. Install with: pip install paypalrestsdk")
            return {
                "success": False,
                "error": "PayPal SDK not installed"
            }
            
        try:
            payment = paypalrestsdk.Payment.find(payment_id)
            
            if payment.execute({"payer_id": payer_id}):
                logger.info(f"Payment executed successfully. ID: {payment.id}")
                # Get transaction ID from the executed payment
                transaction_id = payment.transactions[0].related_resources[0].sale.id
                return {
                    "success": True,
                    "payment_id": payment.id,
                    "transaction_id": transaction_id,
                    "state": payment.state
                }
            else:
                logger.error(f"Payment execution failed: {payment.error}")
                return {
                    "success": False,
                    "error": payment.error
                }
        except Exception as e:
            logger.error(f"PayPal payment execution error: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }

    @staticmethod
    def get_payment(payment_id):
        """
        Get payment details
        
        Args:
            payment_id: PayPal payment ID
            
        Returns:
            Payment object or None
        """
        if not paypalrestsdk:
            logger.error("PayPal SDK not installed. Install with: pip install paypalrestsdk")
            return None
            
        try:
            payment = paypalrestsdk.Payment.find(payment_id)
            return payment
        except Exception as e:
            logger.error(f"PayPal get payment error: {str(e)}")
            return None
