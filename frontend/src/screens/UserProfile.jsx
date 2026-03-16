import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Table, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { getUserProfile, userLogout } from '../actions/userActions';
import { getOrders } from '../actions/orderActions';
import ProtectedRoute from '../components/ProtectedRoute';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userProfile = useSelector((state) => state.userProfile);
  const orders = useSelector((state) => state.orders);

  const { userInfo } = userLogin;
  const { loading: profileLoading, userInfo: profileData } = userProfile;
  const { loading: ordersLoading, orders: ordersList } = orders;

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getOrders());
  }, [dispatch]);

  const displayUserInfo = profileData || userInfo;

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'danger';
      case 'Seller':
        return 'success';
      case 'User':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <ProtectedRoute>
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={8}>
            <Card className="shadow">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">Profile Information</h4>
              </Card.Header>
              <Card.Body>
                {profileLoading ? (
                  <div className="text-center">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  <>
                    <Row className="mb-4">
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="text-muted">Full Name</label>
                          <p className="fs-5">
                            {displayUserInfo?.first_name} {displayUserInfo?.last_name}
                          </p>
                        </div>
                        <div className="mb-3">
                          <label className="text-muted">Email</label>
                          <p className="fs-5">{displayUserInfo?.email}</p>
                        </div>
                        <div className="mb-3">
                          <label className="text-muted">Phone Number</label>
                          <p className="fs-5">{displayUserInfo?.phone_number || 'Not provided'}</p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="text-muted">Location</label>
                          <p className="fs-5">{displayUserInfo?.location || 'Not provided'}</p>
                        </div>
                        <div className="mb-3">
                          <label className="text-muted">Gender</label>
                          <p className="fs-5">{displayUserInfo?.gender || 'Not provided'}</p>
                        </div>
                        <div className="mb-3">
                          <label className="text-muted">Role</label>
                          <p className="fs-5">
                            <Badge bg={getRoleColor(displayUserInfo?.role)}>{displayUserInfo?.role}</Badge>
                          </p>
                        </div>
                      </Col>
                    </Row>

                    {displayUserInfo?.role === 'Seller' && displayUserInfo?.merchant_id && (
                      <Alert variant="success" className="mb-0">
                        <strong>Merchant ID:</strong> {displayUserInfo.merchant_id}
                      </Alert>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Order History */}
        <Row>
          <Col lg={12}>
            <Card className="shadow">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">Order History</h4>
              </Card.Header>
              <Card.Body>
                {ordersLoading ? (
                  <div className="text-center">
                    <Spinner animation="border" />
                  </div>
                ) : ordersList && ordersList.length > 0 ? (
                  <Table responsive striped hover>
                    <thead className="table-light">
                      <tr>
                        <th>Service Name</th>
                        <th>Price Paid</th>
                        <th>Purchase Date</th>
                        <th>PayPal Transaction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersList.map((order) => (
                        <tr key={order.id}>
                          <td className="fw-bold">{order.service_name}</td>
                          <td>₱{order.price_paid?.toLocaleString()}</td>
                          <td>{new Date(order.date_purchased).toLocaleDateString()}</td>
                          <td>
                            <code>{order.paypal_transaction_id}</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Alert variant="info" className="mb-0">
                    You haven't placed any orders yet. <strong>Browse services and book one today!</strong>
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

export default UserProfile;
