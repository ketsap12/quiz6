from django.urls import path
from .views import CreateOrderView, UserOrderHistoryView, CreatePaymentView, ExecutePaymentView

urlpatterns = [
    # PayPal payment endpoints
    path('payment/create/', CreatePaymentView.as_view(), name='create_payment'),
    path('payment/execute/', ExecutePaymentView.as_view(), name='execute_payment'),
    
    # Order endpoints
    path('create/', CreateOrderView.as_view(), name='create_order'),
    path('history/', UserOrderHistoryView.as_view(), name='order_history'),
]
