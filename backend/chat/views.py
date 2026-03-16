from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class AIChatbotView(APIView):
    """AI Chatbot for flooring-related questions"""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        question = request.data.get('question', '').strip().lower()
        
        if not question:
            return Response({'error': 'Question required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Keywords for flooring and platform topics
        flooring_keywords = ['floor', 'tile', 'wood', 'vinyl', 'laminate', 'epoxy', 'grout', 'marble', 'flooring', 'installation', 'polishing', 'repair', 'coating', 'service']
        platform_keywords = ['service', 'seller', 'order', 'register', 'payment', 'paypal', 'profile', 'apply', 'seller application', 'help', 'support']
        
        is_relevant = any(keyword in question for keyword in flooring_keywords + platform_keywords)
        
        if not is_relevant:
            return Response({
                'response': 'I can only help with flooring-related questions and platform support. Please ask about flooring services, installation, maintenance, or how to use our platform.'
            }, status=status.HTTP_200_OK)
        
        # Simple responses based on keywords
        responses = {
            'tile': 'Tile flooring is a durable and popular choice for kitchens and bathrooms. Our experts offer tile installation, grout cleaning, and tile repair services.',
            'hardwood': 'Hardwood flooring adds elegance to any home. We offer hardwood installation, polishing, restoration, and refinishing services.',
            'vinyl': 'Vinyl flooring is affordable, waterproof, and easy to maintain. Perfect for bathrooms, kitchens, and basements.',
            'epoxy': 'Epoxy floor coating provides a protective and decorative finish. Great for garages, basements, and commercial spaces.',
            'laminate': 'Laminate flooring is budget-friendly and mimics the look of hardwood. Our experts can help with installation and repairs.',
            'marble': 'Marble flooring is luxurious but requires careful maintenance. We offer marble restoration and polishing services.',
            'installation': 'We offer professional flooring installation services. Complete your registration, browse our expert sellers, and order the service you need!',
            'order': 'To order a service, browse our available flooring services, select the one you want, complete payment through PayPal, and you\'re done!',
            'register': 'To register, click on Sign Up, fill in your details, and create your account. You\'ll automatically have the User role.',
            'seller': 'To become a seller, register first, then apply through the "Apply to be Seller" option. An admin will review and approve your application.',
            'help': 'I\'m here to help with flooring questions and platform support. Feel free to ask anything about our services!',
        }
        
        response_text = 'Thank you for your question! Our platform offers professional flooring services. Please feel free to ask more specific questions about flooring types, installation, or how to use our services.'
        
        for key, value in responses.items():
            if key in question:
                response_text = value
                break
        
        return Response({'response': response_text}, status=status.HTTP_200_OK)
