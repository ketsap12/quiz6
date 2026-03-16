import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { userLogout } from '../actions/userActions';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/signin');
  };

  return (
    <Navbar bg="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🏗️ Flooring Services
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={Link} to="/">
              Browse Services
            </Nav.Link>

            <Nav.Link as={Link} to="/chat">
              💬 Chat Support
            </Nav.Link>

            {userInfo ? (
              <>
                {userInfo.role === 'Admin' && (
                  <Nav.Link as={Link} to="/admin/users">
                    Admin Panel
                  </Nav.Link>
                )}
                {userInfo.role === 'Seller' && (
                  <Nav.Link as={Link} to="/seller/dashboard">
                    Dashboard
                  </Nav.Link>
                )}
                {userInfo.role === 'User' && (
                  <Nav.Link as={Link} to="/apply-seller">
                    Become Seller
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/profile">
                  {userInfo.email}
                </Nav.Link>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signin">
                  Sign In
                </Nav.Link>
                <Button variant="primary" size="sm" as={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
