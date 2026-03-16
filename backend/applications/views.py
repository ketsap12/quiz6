from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from applications.models import SellerApplication
from users.models import CustomUser
from .serializers import SellerApplicationSerializer


class SubmitApplicationView(APIView):
    """Submit seller application"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if request.user.role == 'Seller':
            return Response({'error': 'Already a seller'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            application = SellerApplication.objects.get(user=request.user)
            return Response({'error': 'Application already exists'}, status=status.HTTP_400_BAD_REQUEST)
        except SellerApplication.DoesNotExist:
            application = SellerApplication.objects.create(user=request.user)
            serializer = SellerApplicationSerializer(application)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class ListApplicationView(APIView):
    """List all seller applications (Admin only)"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != 'Admin':
            return Response({'error': 'Admin required'}, status=status.HTTP_403_FORBIDDEN)
        
        applications = SellerApplication.objects.all()
        serializer = SellerApplicationSerializer(applications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ApproveApplicationView(APIView):
    """Approve seller application"""
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, id):
        if request.user.role != 'Admin':
            return Response({'error': 'Admin required'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            application = SellerApplication.objects.get(id=id)
            merchant_id = request.data.get('merchant_id')
            if not merchant_id:
                return Response({'error': 'merchant_id required'}, status=status.HTTP_400_BAD_REQUEST)
            
            application.status = 'Approved'
            application.save()
            
            user = application.user
            user.role = 'Seller'
            user.merchant_id = merchant_id
            user.save()
            
            serializer = SellerApplicationSerializer(application)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except SellerApplication.DoesNotExist:
            return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)


class DeclineApplicationView(APIView):
    """Decline seller application"""
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, id):
        if request.user.role != 'Admin':
            return Response({'error': 'Admin required'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            application = SellerApplication.objects.get(id=id)
            decline_reason = request.data.get('decline_reason')
            if not decline_reason:
                return Response({'error': 'decline_reason required'}, status=status.HTTP_400_BAD_REQUEST)
            
            application.status = 'Declined'
            application.decline_reason = decline_reason
            application.save()
            
            serializer = SellerApplicationSerializer(application)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except SellerApplication.DoesNotExist:
            return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)
