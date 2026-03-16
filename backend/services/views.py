from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from services.models import Service
from .serializers import ServiceSerializer


class ServiceListView(APIView):
    """List all services (public)"""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ServiceDetailView(APIView):
    """Get service detail (public)"""
    permission_classes = [permissions.AllowAny]

    def get(self, request, id):
        try:
            service = Service.objects.get(id=id)
            serializer = ServiceSerializer(service)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)


class SellerServiceManageView(APIView):
    """List and create seller services"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != 'Seller':
            return Response({'error': 'Seller access required'}, status=status.HTTP_403_FORBIDDEN)
        
        services = Service.objects.filter(seller=request.user)
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        if request.user.role != 'Seller':
            return Response({'error': 'Seller access required'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(seller=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SellerServiceDetailView(APIView):
    """Update and delete seller services"""
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, id):
        if request.user.role != 'Seller':
            return Response({'error': 'Seller access required'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            service = Service.objects.get(id=id, seller=request.user)
            serializer = ServiceSerializer(service, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        if request.user.role != 'Seller':
            return Response({'error': 'Seller access required'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            service = Service.objects.get(id=id, seller=request.user)
            service.delete()
            return Response({'message': 'Service deleted'}, status=status.HTTP_204_NO_CONTENT)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)
