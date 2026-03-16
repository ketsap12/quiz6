import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { getServicesList } from '../actions/serviceActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const servicesList = useSelector((state) => state.servicesList);
  const { loading, services, error } = servicesList;

  // Helper to get correct image for service
  const getServiceImage = (service) => {
    if (service.sample_image) {
      return service.sample_image.startsWith('http') 
        ? service.sample_image 
        : `http://localhost:8000${service.sample_image}`;
    }
    
    const name = service.service_name.toLowerCase();
    if (name.includes('epoxy')) return '/epoxy.jpg';
    if (name.includes('grout')) return '/grout.jpg';
    if (name.includes('hardwood')) return '/hardwood.jpg';
    if (name.includes('laminate')) return '/laminate.jpg';
    if (name.includes('vinyl')) return '/vinyl.jpg';
    return '/tilefloor.jpg'; // default for tile or others
  };

  const [dummyServices] = useState([
    {
      id: 1,
      service_name: 'Tile Floor Installation',
      description: 'Professional tile installation for kitchens and bathrooms. We use high-quality tiles and expert techniques.',
      price: 2500,
      duration_of_service: '2-3 days',
      seller_name: 'Marco Santos',
      rating: 4.8,
      image: '/tilefloor.jpg',
    },
    {
      id: 2,
      service_name: 'Hardwood Floor Polishing',
      description: 'Restore the shine of your hardwood floors with our expert polishing service. Makes floors look brand new.',
      price: 1800,
      duration_of_service: '1-2 days',
      seller_name: 'Maria Cruz',
      rating: 4.9,
      image: '/hardwood.jpg',
    },
    {
      id: 3,
      service_name: 'Vinyl Flooring Installation',
      description: 'Durable and affordable vinyl flooring perfect for any room. Waterproof and easy to maintain.',
      price: 1500,
      duration_of_service: '1 day',
      seller_name: 'John Reyes',
      rating: 4.6,
      image: '/vinyl.jpg',
    },
    {
      id: 4,
      service_name: 'Epoxy Floor Coating',
      description: 'Protective and decorative epoxy coating for garages and basements. Lasts for years.',
      price: 3200,
      duration_of_service: '2 days',
      seller_name: 'Rosa Mendoza',
      rating: 4.7,
      image: '/epoxy.jpg',
    },
    {
      id: 5,
      service_name: 'Laminate Floor Repair',
      description: 'Fix damaged laminate flooring. We handle scratches, dents, and replacement of damaged planks.',
      price: 1200,
      duration_of_service: '4-6 hours',
      seller_name: 'Antonio Lim',
      rating: 4.5,
      image: '/laminate.jpg',
    },
    {
      id: 6,
      service_name: 'Grout Cleaning Service',
      description: 'Deep clean grout lines between tiles. Removes mold, mildew, and stains.',
      price: 800,
      duration_of_service: '3-4 hours',
      seller_name: 'Lisa Torres',
      rating: 4.8,
      image: '/grout.jpg',
    },
  ]);

  useEffect(() => {
    dispatch(getServicesList());
  }, [dispatch]);

  const displayServices = services && services.length > 0 ? services : dummyServices;

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <h1 className="display-4 fw-bold mb-2">Find Trusted Flooring Experts</h1>
          <p className="lead">Professional flooring services for homes and businesses</p>
        </Container>
      </div>

      {/* Services Section */}
      <Container className="py-5">
        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading services...</p>
          </div>
        ) : (
          <>
            <h2 className="mb-4">Available Services</h2>
            <Row>
              {displayServices.map((service) => (
                <Col md={6} lg={4} key={service.id} className="mb-4">
                  <Card className="h-100 shadow-sm hover-card" style={{ cursor: 'pointer' }}>
                    {/* Service Image */}
                    <img
                      src={getServiceImage(service)}
                      alt={service.service_name}
                      style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                      onError={(e) => { e.target.src = '/tilefloor.jpg'; }}
                    />

                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="mb-2">{service.service_name}</Card.Title>

                      <p className="text-muted small mb-2">
                        <strong>Expert:</strong> {service.seller_name}
                      </p>

                      <Card.Text className="flex-grow-1">{service.description}</Card.Text>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-warning">⭐ {service.rating}</span>
                          <span className="badge bg-info">₱{service.price}</span>
                        </div>
                        <small className="text-muted">Duration: {service.duration_of_service}</small>
                      </div>

                      <Button
                        variant="primary"
                        onClick={() => navigate(`/service/${service.id}`)}
                        className="w-100"
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>

      <style>{`
        .hover-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;
