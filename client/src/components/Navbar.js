import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const MainNavbar = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };

  return (
    <Navbar 
      expand="lg" 
      className={`shadow-sm ${theme === 'dark' ? 'bg-dark navbar-dark' : 'bg-white navbar-light'}`}
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <i className="bi bi-tools me-2 text-primary"></i>
          <span className="fw-bold">My Personal Helper</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
            <Nav.Link as={Link} to="/services" className="px-3">Services</Nav.Link>
            <Nav.Link as={Link} to="/about" className="px-3">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="px-3">Contact</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            <Button 
              variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
              onClick={toggleTheme}
              className="me-3"
            >
              <i className={`bi bi-${theme === 'dark' ? 'sun' : 'moon'}-fill`}></i>
            </Button>

            {userInfo ? (
              <>
                <Nav.Link as={Link} to="/profile" className="me-3">
                  <i className="bi bi-person-circle me-1"></i>
                  {userInfo.name}
                </Nav.Link>
                {userInfo.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin" className="me-3">
                    <i className="bi bi-gear-fill me-1"></i>
                    Admin Panel
                  </Nav.Link>
                )}
                <Button 
                  variant={theme === 'dark' ? 'outline-warning' : 'outline-danger'}
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register" className="me-3">
                  <Button variant={theme === 'dark' ? 'warning' : 'primary'}>
                    <i className="bi bi-person-plus-fill me-1"></i>
                    Register
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  <Button variant={theme === 'dark' ? 'outline-warning' : 'outline-primary'}>
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Login
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;