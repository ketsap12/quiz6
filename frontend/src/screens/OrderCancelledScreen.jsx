import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Alert, Button, Card } from 'react-bootstrap';

const OrderCancelledScreen = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1 className="text-warning">⚠ Payment Cancelled</h1>
        <p className="lead">Your payment was not completed.</p>
      </div>

      <Alert variant="warning">
        <h5>What happened?</h5>
        <p>You cancelled the payment on PayPal. Your order was not created.</p>
      </Alert>

      <Card className="bg-light shadow-sm mb-4">
        <Card.Body>
          <h5>No Charges</h5>
          <p className="mb-0">
            Since the payment was cancelled, no money has been deducted from your
            account.
          </p>
        </Card.Body>
      </Card>

      <div className="row">
        <div className="col-md-6">
          <Button
            variant="primary"
            size="lg"
            className="w-100"
            onClick={() => navigate(-1)}
          >
            Try Again
          </Button>
        </div>
        <div className="col-md-6">
          <Button
            variant="secondary"
            size="lg"
            className="w-100"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>

      <Alert variant="info" className="mt-4">
        <h5>Need Help?</h5>
        <ul className="mb-0">
          <li>
            Chat with our support team using the Chat Support link in the navbar
          </li>
          <li>Contact us directly for assistance</li>
        </ul>
      </Alert>
    </Container>
  );
};

export default OrderCancelledScreen;
