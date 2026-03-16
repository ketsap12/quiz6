import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, InputGroup, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { sendChatMessage } from '../actions/chatActions';

const ChatBot = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const { loading, response, error } = chat;

  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! I am the Flooring Services Assistant. I can help you with questions about flooring services, materials, installation, and how to use our platform. What would you like to know?',
    },
  ]);

  const handleSendMessage = () => {
    if (!question.trim()) return;

    // Add user message
    setMessages([...messages, { type: 'user', text: question }]);
    setQuestion('');

    // Send to API
    dispatch(sendChatMessage(question));
  };

  React.useEffect(() => {
    if (response) {
      setMessages((prev) => [...prev, { type: 'bot', text: response }]);
    }
  }, [response]);

  return (
    <Card className="shadow-lg" style={{ maxHeight: '600px', display: 'flex', flexDirection: 'column' }}>
      <Card.Header className="bg-success text-white">
        <h5 className="mb-0">🤖 Flooring Services Assistant</h5>
      </Card.Header>

      <Card.Body style={{ overflowY: 'auto', flex: 1 }} className="bg-light">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-3">
            {msg.type === 'user' ? (
              <div className="text-end">
                <div
                  className="d-inline-block bg-primary text-white p-2 rounded"
                  style={{ maxWidth: '80%', wordWrap: 'break-word' }}
                >
                  <p className="mb-0">{msg.text}</p>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className="d-inline-block bg-white border p-2 rounded"
                  style={{ maxWidth: '80%', wordWrap: 'break-word' }}
                >
                  <p className="mb-0">{msg.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="text-center mb-3">
            <Spinner animation="border" size="sm" />
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
      </Card.Body>

      <Card.Footer>
        <InputGroup>
          <Form.Control
            placeholder="Ask about flooring services..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={loading}
          />
          <Button variant="success" onClick={handleSendMessage} disabled={loading || !question.trim()}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Send'}
          </Button>
        </InputGroup>
      </Card.Footer>
    </Card>
  );
};

export default ChatBot;
