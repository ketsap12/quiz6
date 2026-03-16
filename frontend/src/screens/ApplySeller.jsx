import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { submitApplication } from '../actions/applicationActions';
import ProtectedRoute from '../components/ProtectedRoute';

const ApplySeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const sellerApplication = useSelector((state) => state.sellerApplication);
  const { userInfo } = userLogin;
  const { application, success, error, loading } = sellerApplication;

  useEffect(() => {
    if (success && application) {
      setTimeout(() => navigate('/profile'), 2000);
    }
  }, [success, application, navigate]);

  const handleApply = () => {
    dispatch(submitApplication());
  };

  // Check if user is already a seller
  if (userInfo?.role === 'Seller') {
    return (
      <Container className="py-5">
        <Alert variant="info">You are already an approved seller! Visit your dashboard to manage services.</Alert>
        <Button variant="primary" onClick={() => navigate('/seller/dashboard')}>
          Go to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <ProtectedRoute>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow">
              <Card.Body>
                <h1 className="mb-4">Apply to Become a Flooring Service Expert</h1>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">Application submitted successfully! You will be redirected shortly.</Alert>}

                <Card className="bg-light mb-4">
                  <Card.Body>
                    <h5>Why become a seller on our platform?</h5>
                    <ul className="mb-0">
                      <li>Reach more customers looking for flooring services</li>
                      <li>Manage your services and pricing</li>
                      <li>Get paid directly through PayPal</li>
                      <li>Build your reputation with customer ratings</li>
                      <li>Flexible scheduling and service management</li>
                    </ul>
                  </Card.Body>
                </Card>

                <h5 className="mb-3">Application Requirements</h5>
                <ul>
                  <li>Must be at least 18 years old</li>
                  <li>Valid contact information</li>
                  <li>Experience in flooring services</li>
                  <li>PayPal account for receiving payments</li>
                  <li>Professional and reliable work history</li>
                </ul>

                <hr className="my-4" />

                <p className="text-muted">
                  By applying, you agree to our seller terms and conditions. An admin will review your application within 24-48 hours.
                </p>

                <Button
                  variant="success"
                  size="lg"
                  className="w-100"
                  onClick={handleApply}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>

                {application && (
                  <Alert variant="info" className="mt-4">
                    <strong>Application Status:</strong> {application.status}
                    {application.status === 'Pending' && (
                      <p className="mb-0 mt-2">
                        Your application is being reviewed. You will be notified once a decision is made.
                      </p>
                    )}
                    {application.status === 'Declined' && (
                      <p className="mb-0 mt-2">
                        <strong>Reason:</strong> {application.decline_reason}
                      </p>
                    )}
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ProtectedRoute>
  );
};

export default ApplySeller;
