import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Form, Table, Modal, Alert, Spinner } from 'react-bootstrap';
import { getSellerServices, createService, updateService, deleteService } from '../actions/serviceActions';
import ProtectedRoute from '../components/ProtectedRoute';

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const sellerServices = useSelector((state) => state.sellerServices);
  const { userInfo } = userLogin;
  const { loading, services, error } = sellerServices;

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    service_name: '',
    description: '',
    price: '',
    duration_of_service: '',
  });
  const [sampleImage, setSampleImage] = useState(null);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(getSellerServices());
  }, [dispatch]);

  const validateForm = () => {
    if (!formData.service_name.trim()) {
      setFormError('Service name is required');
      return false;
    }
    if (!formData.description.trim()) {
      setFormError('Description is required');
      return false;
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      setFormError('Valid price is required');
      return false;
    }
    if (!formData.duration_of_service.trim()) {
      setFormError('Duration is required');
      return false;
    }
    return true;
  };

  const handleAddService = () => {
    setEditingId(null);
    setFormData({ service_name: '', description: '', price: '', duration_of_service: '' });
    setSampleImage(null);
    setFormError('');
    setShowModal(true);
  };

  const handleEditService = (service) => {
    setEditingId(service.id);
    setFormData({
      service_name: service.service_name,
      description: service.description,
      price: service.price,
      duration_of_service: service.duration_of_service,
    });
    setSampleImage(null);
    setFormError('');
    setShowModal(true);
  };

  const handleSaveService = async () => {
    if (!validateForm()) return;

    const data = new FormData();
    data.append('service_name', formData.service_name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('duration_of_service', formData.duration_of_service);
    if (sampleImage) {
      data.append('sample_image', sampleImage);
    }

    try {
      if (editingId) {
        await dispatch(updateService(editingId, data));
      } else {
        await dispatch(createService(data));
      }
      setShowModal(false);
      setSuccessMessage(editingId ? 'Service updated successfully!' : 'Service created successfully!');
      dispatch(getSellerServices());
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to save service');
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await dispatch(deleteService(id));
        setSuccessMessage('Service deleted successfully!');
        dispatch(getSellerServices());
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setFormError(err.response?.data?.error || 'Failed to delete service');
      }
    }
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setSampleImage(e.target.files[0]);
  };

  return (
    <ProtectedRoute sellerOnly>
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h1>Seller Dashboard</h1>
              <Button variant="success" onClick={handleAddService}>
                + Add New Service
              </Button>
            </div>
            <p className="text-muted">Manage your flooring services</p>
          </Col>
        </Row>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Service Form Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{editingId ? 'Edit Service' : 'Add New Service'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {formError && <Alert variant="danger">{formError}</Alert>}

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Service Name</Form.Label>
                <Form.Control
                  type="text"
                  name="service_name"
                  placeholder="e.g., Tile Floor Installation"
                  value={formData.service_name}
                  onChange={handleChangeForm}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Describe your service..."
                  value={formData.description}
                  onChange={handleChangeForm}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price (₱)</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      placeholder="2500"
                      value={formData.price}
                      onChange={handleChangeForm}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      type="text"
                      name="duration_of_service"
                      placeholder="e.g., 2-3 days"
                      value={formData.duration_of_service}
                      onChange={handleChangeForm}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Service Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Form.Text className="text-muted">
                  Upload a photo of your work to attract customers.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveService}>
              {editingId ? 'Update Service' : 'Create Service'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Services List */}
        <Card className="shadow">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">My Services</h5>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : services && services.length > 0 ? (
              <Table responsive striped hover vertical-align="middle">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Service Name</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td>
                        <img 
                          src={service.sample_image || '/tilefloor.jpg'} 
                          alt={service.service_name} 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                          onError={(e) => { e.target.src = '/tilefloor.jpg'; }}
                        />
                      </td>
                      <td>
                        <div className="fw-bold">{service.service_name}</div>
                        <small className="text-muted d-block" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {service.description}
                        </small>
                      </td>
                      <td>₱{service.price?.toLocaleString()}</td>
                      <td>{service.duration_of_service}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditService(service)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="info" className="mb-0">
                You haven't added any services yet. <strong>Click "Add New Service" to get started!</strong>
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </ProtectedRoute>
  );
};

export default SellerDashboard;
