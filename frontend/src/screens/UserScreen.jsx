import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Table, Modal, Form, Button, Badge, Nav, Tab, Spinner, Alert } from 'react-bootstrap';
import { getUsersList } from '../actions/userActions';
import { getSellerApplications, approveApplication, declineApplication } from '../actions/applicationActions';
import ProtectedRoute from '../components/ProtectedRoute';

const UserScreen = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const sellerApplicationsList = useSelector((state) => state.sellerApplicationsList);

  const { loading: usersLoading, users, error: usersError } = usersList;
  const { loading: appsLoading, applications, error: appsError } = sellerApplicationsList;

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [merchantId, setMerchantId] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    dispatch(getUsersList());
    dispatch(getSellerApplications());
  }, [dispatch]);

  const handleApproveClick = (app) => {
    setSelectedApp(app);
    setMerchantId('');
    setShowApproveModal(true);
  };

  const handleApprove = async () => {
    if (!merchantId.trim()) {
      alert('Please enter a merchant ID');
      return;
    }
    try {
      await approveApplication(selectedApp.id, merchantId);
      setShowApproveModal(false);
      setMessage({ type: 'success', text: 'Application approved successfully!' });
      dispatch(getSellerApplications());
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.error || 'Failed to approve' });
    }
  };

  const handleDeclineClick = (app) => {
    setSelectedApp(app);
    setDeclineReason('');
    setShowDeclineModal(true);
  };

  const handleDecline = async () => {
    if (!declineReason.trim()) {
      alert('Please enter a decline reason');
      return;
    }
    try {
      await declineApplication(selectedApp.id, declineReason);
      setShowDeclineModal(false);
      setMessage({ type: 'success', text: 'Application declined successfully!' });
      dispatch(getSellerApplications());
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.error || 'Failed to decline' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Declined':
        return 'danger';
      case 'Pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <ProtectedRoute adminOnly>
      <Container className="py-5">
        <h1 className="mb-4">Admin Panel</h1>

        {message.text && <Alert variant={message.type}>{message.text}</Alert>}

        <Card className="shadow">
          <Card.Body>
            <Tab.Container defaultActiveKey="users">
              <Nav variant="tabs" className="mb-4">
                <Nav.Item>
                  <Nav.Link eventKey="users">All Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="applications">Seller Applications</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                {/* Users Tab */}
                <Tab.Pane eventKey="users">
                  {usersLoading ? (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  ) : usersError ? (
                    <Alert variant="danger">{usersError}</Alert>
                  ) : users && users.length > 0 ? (
                    <Table responsive striped hover>
                      <thead className="table-light">
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>
                              <Badge bg={user.role === 'Admin' ? 'danger' : user.role === 'Seller' ? 'success' : 'info'}>
                                {user.role}
                              </Badge>
                            </td>
                            <td>
                              <Button variant="info" size="sm" className="me-2">
                                Edit
                              </Button>
                              <Button variant="danger" size="sm">
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <Alert variant="info">No users found</Alert>
                  )}
                </Tab.Pane>

                {/* Seller Applications Tab */}
                <Tab.Pane eventKey="applications">
                  {appsLoading ? (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  ) : appsError ? (
                    <Alert variant="danger">{appsError}</Alert>
                  ) : applications && applications.length > 0 ? (
                    <Table responsive striped hover>
                      <thead className="table-light">
                        <tr>
                          <th>User Email</th>
                          <th>Status</th>
                          <th>Applied Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((app) => (
                          <tr key={app.id}>
                            <td>{app.user_email}</td>
                            <td>
                              <Badge bg={getStatusColor(app.status)}>{app.status}</Badge>
                            </td>
                            <td>{new Date(app.created_at).toLocaleDateString()}</td>
                            <td>
                              {app.status === 'Pending' ? (
                                <>
                                  <Button
                                    variant="success"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleApproveClick(app)}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDeclineClick(app)}
                                  >
                                    Decline
                                  </Button>
                                </>
                              ) : app.status === 'Declined' ? (
                                <small className="text-muted">Declined: {app.decline_reason}</small>
                              ) : (
                                <Badge bg="success">Approved</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <Alert variant="info">No seller applications yet</Alert>
                  )}
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>

        {/* Approve Modal */}
        <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Approve Seller Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>User Email</Form.Label>
                <Form.Control type="text" disabled value={selectedApp?.user_email || ''} />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Assign Merchant ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter merchant ID"
                  value={merchantId}
                  onChange={(e) => setMerchantId(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowApproveModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleApprove}>
              Approve
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Decline Modal */}
        <Modal show={showDeclineModal} onHide={() => setShowDeclineModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Decline Seller Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>User Email</Form.Label>
                <Form.Control type="text" disabled value={selectedApp?.user_email || ''} />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Reason for Declining</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Explain why the application is being declined..."
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeclineModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDecline}>
              Decline
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </ProtectedRoute>
  );
};

export default UserScreen;
