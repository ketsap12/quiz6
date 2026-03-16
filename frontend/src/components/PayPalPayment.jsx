import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const PayPalPayment = ({ serviceId, serviceName, price, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create payment
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please sign in first.');
        setLoading(false);
        return;
      }

      const createResponse = await axios.post(
        'http://localhost:8000/api/v1/orders/payment/create/',
        {
          service_id: serviceId,
          return_url: `${window.location.origin}/order-success`,
          cancel_url: `${window.location.origin}/order-cancelled`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (createResponse.data.success && createResponse.data.approval_url) {
        // Store serviceId for OrderSuccessScreen
        localStorage.setItem('paymentServiceId', serviceId);
        
        // Redirect to PayPal approval URL
        window.location.href = createResponse.data.approval_url;
      } else {
        setError('Failed to create payment. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Payment creation error:', err);
      setError(
        err.response?.data?.error ||
          'An error occurred while processing your payment. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      <button
        className="btn btn-primary btn-lg w-100"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Processing...
          </>
        ) : (
          `Pay ₱${price} via PayPal`
        )}
      </button>
      <small className="d-block mt-2 text-muted">
        You will be redirected to PayPal to complete the payment securely.
      </small>
    </div>
  );
};

export default PayPalPayment;
