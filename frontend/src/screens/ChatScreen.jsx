import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChatBot from '../components/ChatBot';

const ChatScreen = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="mb-4">Flooring Services Support</h1>
          <p className="text-muted mb-4">
            Ask our AI assistant any questions about flooring services, installation, maintenance, or how to use our platform.
          </p>
          <ChatBot />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatScreen;
