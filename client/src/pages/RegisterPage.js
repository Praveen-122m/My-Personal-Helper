import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

const RegisterPage = ({ setUserInfo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [services, setServices] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [areaOfOperation, setAreaOfOperation] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [idProofFile, setIdProofFile] = useState(null); 
  const [idProofPreviewUrl, setIdProofPreviewUrl] = useState(null); 

  useEffect(() => {
    return () => {
      if (idProofPreviewUrl) {
        URL.revokeObjectURL(idProofPreviewUrl);
      }
    };
  }, [idProofPreviewUrl]);

  const handleFileChange = (e, setFileState, setPreviewUrlState = null) => {
    const file = e.target.files[0];
    setFileState(file);

    if (setPreviewUrlState && file) {
      const url = URL.createObjectURL(file);
      setPreviewUrlState(url);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const registerData = {
      name, email, password, role, phone, address,
      city, state,
    };

    if (role === 'helper') {
      registerData.services = services.split(',').map(s => s.trim()).filter(s => s !== '');
      registerData.experience = experience;
      registerData.bio = bio;
      registerData.hourlyRate = hourlyRate;
      registerData.areaOfOperation = areaOfOperation.split(',').map(a => a.trim()).filter(a => a !== '');
      registerData.aadhaarNumber = aadhaarNumber;
      registerData.idProofUrl = idProofFile ? 'demo_aadhaar_url' : ''; 
      registerData.profilePicture = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/auth/register',
        registerData,
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      setUserInfo(data);
      setSuccess('Registration successful! You are now logged in. Redirecting...');
      navigate('/');

    } catch (err) {
      setError(err.response && err.response.data.message 
        ? err.response.data.message 
        : 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <Container fluid className={`min-vh-100 d-flex justify-content-center align-items-center py-5 ${
      theme === 'dark' ? 'bg-dark' : 'bg-light'
    }`}>
      <Container className="px-4">
        <Card className={`shadow-lg mx-auto ${
          theme === 'dark' ? 'bg-dark text-light' : 'bg-white'
        }`} style={{ maxWidth: '800px' }}>
          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <i className={`bi bi-person-plus-circle display-1 ${
                theme === 'dark' ? 'text-warning' : 'text-primary'
              }`}></i>
              <h2 className={`h3 mt-3 mb-4 fw-bold ${
                theme === 'dark' ? 'text-light' : 'text-dark'
              }`}>Create Your Account</h2>
            </div>
            
            {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
            {success && <Alert variant="success" className="mb-4">{success}</Alert>}
            
            <Form onSubmit={submitHandler}>
              <Row className="g-4">
                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-4 mt-2">
                <Col md={6}>
                  <Form.Group controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-4 mt-2">
                <Col md={6}>
                  <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="role" className="mt-4">
                <Form.Label>Register as</Form.Label>
                <Form.Select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                >
                  <option value="user">Customer</option>
                  <option value="helper">Service Provider</option>
                </Form.Select>
              </Form.Group>

              {role === 'helper' && (
                <div className={`mt-4 p-4 rounded-3 ${theme === 'dark' ? 'bg-secondary' : 'bg-light'}`}>
                  <h4 className={`text-center mb-4 ${theme === 'dark' ? 'text-warning' : 'text-primary'}`}>
                    Service Provider Details
                  </h4>
                  
                  <Row className="g-4">
                    <Col md={12}>
                      <Form.Group controlId="services">
                        <Form.Label>Services Offered (comma-separated)</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Electrician, Plumber"
                          value={services}
                          onChange={(e) => setServices(e.target.value)}
                          required
                          className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="g-4 mt-2">
                    <Col md={6}>
                      <Form.Group controlId="experience">
                        <Form.Label>Years of Experience</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter years of experience"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          required
                          className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="hourlyRate">
                        <Form.Label>Hourly Rate (₹)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter your hourly rate"
                          value={hourlyRate}
                          onChange={(e) => setHourlyRate(e.target.value)}
                          required
                          className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="bio" className="mt-4">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Tell us about yourself..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>

                  <Form.Group controlId="areaOfOperation" className="mt-4">
                    <Form.Label>Areas of Operation (comma-separated)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., Housing Board, Mandiya Road"
                      value={areaOfOperation}
                      onChange={(e) => setAreaOfOperation(e.target.value)}
                      required
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>

                  <Form.Group controlId="aadhaar" className="mt-4">
                    <Form.Label>Aadhaar Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your 12-digit Aadhaar number"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value)}
                      required
                      maxLength="12"
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>

                  <Form.Group controlId="idProof" className="mt-4">
                    <Form.Label>ID Proof (Aadhaar Card)</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => handleFileChange(e, setIdProofFile, setIdProofPreviewUrl)}
                      required
                      accept="image/*"
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                    {idProofFile && 
                      <Form.Text className={theme === 'dark' ? 'text-light' : 'text-muted'}>
                        Selected: {idProofFile.name}
                      </Form.Text>
                    }
                    {idProofPreviewUrl && (
                      <div className="mt-3">
                        <img 
                          src={idProofPreviewUrl} 
                          alt="ID Preview" 
                          className="rounded-3" 
                          style={{ maxWidth: '200px' }} 
                        />
                      </div>
                    )}
                  </Form.Group>
                </div>
              )}

              <Row className="g-4 mt-4">
                <Col md={6}>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-grid mt-5">
                <Button 
                  type="submit" 
                  variant={theme === 'dark' ? 'warning' : 'primary'}
                  size="lg"
                >
                  Create Account
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className={theme === 'dark' ? 'text-light' : 'text-muted'}>
                  Already have an account?{' '}
                  <Link 
                    to="/login"
                    className={`text-decoration-none ${theme === 'dark' ? 'text-warning' : 'text-primary'}`}
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

export default RegisterPage;