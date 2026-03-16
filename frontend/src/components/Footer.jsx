import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>Flooring Services</h5>
            <p className="text-muted">Your trusted platform for professional flooring services.</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-muted">
                  Browse Services
                </a>
              </li>
              <li>
                <a href="/apply-seller" className="text-muted">
                  Become a Seller
                </a>
              </li>
              <li>
                <a href="/profile" className="text-muted">
                  My Profile
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contact</h5>
            <p className="text-muted">
              Email: support@flooringservices.com
              <br />
              Phone: +63 900 123 4567
            </p>
          </Col>
        </Row>
        <hr className="my-3" />
        <p className="text-center text-muted mb-0">&copy; {currentYear} Flooring Services Platform. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
