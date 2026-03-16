import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import PayPalPayment from '../components/PayPalPayment';

const DetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [dummyServices] = useState({
    1: {
      id: 1,
      service_name: 'Tile Floor Installation',
      description: 'Professional tile floor installation service. We specialize in high-quality tile work for kitchens, bathrooms, and living areas. Our team brings years of experience and attention to detail to every project.',
      price: 2500,
      duration_of_service: '2-3 days',
      seller_name: 'Marco Santos',
      seller_id: 1,
      rating: 4.8,
      image: '/tilefloor.jpg',
      full_description: 'We provide complete tile installation services including floor preparation, layout planning, cutting, and grouting. All materials are sourced from trusted suppliers and we guarantee professional workmanship.',
    },
    2: {
      id: 2,
      service_name: 'Hardwood Floor Polishing',
      description: 'Restore the natural beauty of your hardwood floors with professional polishing. Removes scratches and brings back the original shine.',
      price: 1800,
      duration_of_service: '1-2 days',
      seller_name: 'Maria Cruz',
      seller_id: 2,
      rating: 4.9,
      image: '/hardwood.jpg',
      full_description: 'Our hardwood polishing service uses advanced equipment and eco-friendly products. We handle sanding, staining, and finishing to make your floors look brand new.',
    },
    3: {
      id: 3,
      service_name: 'Vinyl Flooring Installation',
      description: 'Affordable and durable vinyl flooring perfect for kitchens and bathrooms. Waterproof and easy to maintain.',
      price: 1500,
      duration_of_service: '1 day',
      seller_name: 'John Reyes',
      seller_id: 3,
      rating: 4.6,
      image: '/vinyl.jpg',
      full_description: 'We install high-quality vinyl flooring that resists water and stains. Perfect for areas with high moisture. Installation includes subfloor preparation and finishing touches.',
    },
    4: {
      id: 4,
      service_name: 'Epoxy Floor Coating',
      description: 'Protective and decorative epoxy coating for garage and basement floors. Durable, long-lasting finish.',
      price: 3200,
      duration_of_service: '2 days',
      seller_name: 'Rosa Mendoza',
      seller_id: 4,
      rating: 4.7,
      image: '/epoxy.jpg',
      full_description: 'Our epoxy coating provides a tough, professional finish. We handle surface prep, application, and curing. The result is a beautiful, durable floor that lasts for years.',
    },
    5: {
      id: 5,
      service_name: 'Laminate Floor Repair',
      description: 'Fix damaged laminate flooring including scratches, dents, and plank replacement.',
      price: 1200,
      duration_of_service: '4-6 hours',
      seller_name: 'Antonio Lim',
      seller_id: 5,
      rating: 4.5,
      image: '/laminate.jpg',
      full_description: 'We specialize in laminate floor repairs. Minor scratches can be buffed out, and damaged planks are replaced with matching materials for a seamless look.',
    },
    6: {
      id: 6,
      service_name: 'Grout Cleaning Service',
      description: 'Professional deep cleaning of grout lines. Removes mold, mildew, and tough stains.',
      price: 800,
      duration_of_service: '3-4 hours',
      seller_name: 'Lisa Torres',
      seller_id: 6,
      rating: 4.8,
      image: '/grout.jpg',
      full_description: 'Using specialized equipment and cleaning solutions, we deep clean grout lines to restore their original color and prevent mold growth. Safe for all tile types.',
    },
  });

  const [loading, setLoading] = useState(false);

  const service = dummyServices[id];

  if (!service) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Service not found</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Services
        </Button>
      </Container>
    );
  }

  const handleBookService = () => {
    if (!userInfo) {
      navigate('/signin');
      return;
    }
    // Show payment component (handled in render below)
  };

  return (
    <Container className="py-5">
      <Button variant="secondary" className="mb-4" onClick={() => navigate('/')}>
        ← Back to Services
      </Button>

      <Row>
        {/* Service Image */}
        <Col lg={6} className="mb-4">
          <img
            src={service.image}
            alt={service.service_name}
            style={{ height: '400px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
          />
        </Col>

        {/* Service Details */}
        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h1 className="mb-2">{service.service_name}</h1>

              <div className="mb-4">
                <span className="text-warning me-3">⭐ {service.rating} rating</span>
                <span className="text-muted">Expert: {service.seller_name}</span>
              </div>

              <div className="bg-light p-3 rounded mb-4">
                <h3 className="text-primary mb-0">₱{service.price.toLocaleString()}</h3>
                <small className="text-muted">Service price</small>
              </div>

              <div className="mb-4">
                <h5>Service Details</h5>
                <p><strong>Duration:</strong> {service.duration_of_service}</p>
                <p><strong>Expert:</strong> {service.seller_name}</p>
              </div>

              <div className="mb-4">
                <h5>Description</h5>
                <p>{service.full_description}</p>
              </div>

              {userInfo ? (
                <PayPalPayment
                  serviceId={service.id}
                  serviceName={service.service_name}
                  price={service.price}
                />
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100"
                  onClick={() => navigate('/signin')}
                >
                  Sign In to Book Service
                </Button>
              )}
            </Card.Body>
          </Card>

          {/* Info Card */}
          <Card className="mt-4">
            <Card.Body>
              <h5>Why choose this service?</h5>
              <ul>
                <li>Professional and experienced expert</li>
                <li>High-quality materials</li>
                <li>Guaranteed workmanship</li>
                <li>Competitive pricing</li>
                <li>Trusted by hundreds of customers</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailScreen;
