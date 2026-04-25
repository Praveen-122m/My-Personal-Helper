import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = ({ setUserInfo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      setUserInfo(data);
      setSuccess('Login successful! Redirecting...');

      navigate('/'); // <--- Redirect to Homepage for all roles

    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center py-5" 
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)'
      }}>
      <Card className={`shadow-lg border-0 ${
        theme === 'dark' ? 'bg-dark text-light' : 'bg-white'
      }`} style={{ maxWidth: '450px', width: '100%', borderRadius: '1rem' }}>
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <i className={`bi bi-person-circle display-1 ${
              theme === 'dark' ? 'text-warning' : 'text-primary'
            }`}></i>
          </div>
          <h2 className={`text-center mb-4 fw-bold ${
            theme === 'dark' ? 'text-light' : 'text-dark'
          }`}>Welcome Back!</h2>
          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
          {success && <Alert variant="success" className="mb-4">{success}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-4" controlId="email">
              <Form.Label className={theme === 'dark' ? 'text-light' : ''}>
                <i className="bi bi-envelope-fill me-2"></i>Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`form-control-lg ${
                  theme === 'dark' ? 'bg-dark text-light border-secondary' : ''
                }`}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label className={theme === 'dark' ? 'text-light' : ''}>
                <i className="bi bi-lock-fill me-2"></i>Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`form-control-lg ${
                  theme === 'dark' ? 'bg-dark text-light border-secondary' : ''
                }`}
              />
            </Form.Group>

            <div className="d-grid gap-2 mt-4">
              <Button
                variant={theme === 'dark' ? 'warning' : 'primary'}
                type="submit"
                size="lg"
                className="fw-bold"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </Button>
            </div>
          </Form>
          <div className="text-center mt-4">
            <p className={theme === 'dark' ? 'text-light-50' : 'text-muted'}>
              Don't have an account?{' '}
              <Link
                to="/register"
                className={`fw-bold text-decoration-none ${
                  theme === 'dark' ? 'text-warning' : 'text-primary'
                }`}
              >
                Register Here
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;