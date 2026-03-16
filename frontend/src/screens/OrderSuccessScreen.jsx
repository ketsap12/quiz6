import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Alert, Button, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';

const OrderSuccessScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        const paymentId = searchParams.get('paymentId');
        const payerId = searchParams.get('PayerID');
        const serviceId = searchParams.get('serviceId') || localStorage.getItem('paymentServiceId');

        if (!paymentId || !payerId || !serviceId) {
          setError('Invalid payment parameters. Please try again.');
          setLoading(false);
          return;
        }

        // Execute payment on backend
        const response = await axios.post(
          'http://localhost:8000/api/v1/orders/payment/execute/',
          {
            payment_id: paymentId,
            payer_id: payerId,
            service_id: serviceId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.data.success) {
          setSuccess(true);
          setOrderData(response.data.order);
          // Save order to localStorage for display
          localStorage.setItem('lastOrder', JSON.stringify(response.data.order));
          localStorage.removeItem('paymentServiceId');
        } else {
          setError(response.data.error || 'Payment execution failed.');
        }
      } catch (err) {
        console.error('Payment execution error:', err);
        setError(
          err.response?.data?.error ||
            'An error occurred while processing your payment. Please contact support.'
        );
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Processing your payment...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h4>Payment Failed</h4>
          <p>{typeof error === 'object' ? (error.message || JSON.stringify(error)) : error}</p>
        </Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1 className="text-success">✓ Payment Successful!</h1>
        <p className="lead">Your order has been created successfully.</p>
      </div>

      {orderData && (
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-success text-white">
            <h5 className="mb-0">Order Details</h5>
          </Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Order ID:</strong> #{orderData.id}
                </p>
                <p>
                  <strong>Service:</strong> {orderData.service_name || 'Floor Service'}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Amount Paid:</strong> ₱{orderData.price_paid?.toLocaleString() || '0'}
                </p>
                <p>
                  <strong>Transaction ID:</strong>{' '}
                  <small>{orderData.paypal_transaction_id || 'Pending'}</small>
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}

      <div className="row">
        <div className="col-md-6">
          <Button
            variant="primary"
            size="lg"
            className="w-100"
            onClick={() => navigate('/profile')}
          >
            View in My Orders
          </Button>
        </div>
        <div className="col-md-6">
          <Button
            variant="secondary"
            size="lg"
            className="w-100"
            onClick={() => navigate('/')}
          >
            Browse More Services
          </Button>
        </div>
      </div>

      <Alert variant="info" className="mt-4">
        <h5>What's Next?</h5>
        <ul className="mb-0">
          <li>The service provider will contact you shortly</li>
          <li>You can track your order in My Profile → Order History</li>
          <li>Use the chat support for any questions</li>
        </ul>
      </Alert>
    </Container>
  );
};

export default OrderSuccessScreen;
