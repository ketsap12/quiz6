from django.db import models
from users.models import CustomUser


class Service(models.Model):
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='services', limit_choices_to={'role': 'Seller'})
    service_name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_of_service = models.CharField(max_length=255, help_text="e.g., '2-3 hours' or '1 day'")
    sample_image = models.ImageField(upload_to='services/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.service_name

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
