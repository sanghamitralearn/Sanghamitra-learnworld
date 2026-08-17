import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import './authForms.css';

export default function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirectPath') || '/dashboard';
  const infoMessage = searchParams.get('message');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    try {
      const response = await apiFetch('/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        await checkAuth();
        navigate(redirectPath);
      } else {
        setMessage(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred. Please try again later.');
    }
  }

  return (
    <div className="auth-page">
      <h1>User Login</h1>
      <form id="registrationForm" onSubmit={handleSubmit}>
        <div>
          <input type="email" id="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Link to="/forget-password" style={{ fontSize: '0.9em', color: '#007bff', textDecoration: 'none', marginBottom: '5px' }}>
            Forgot Password?
          </Link>
          <input
            type={showPassword ? 'text' : 'password'}
            id="current-password"
            name="current-password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input type="checkbox" id="showPassword" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} /> Show Password
        </div>
        <div className="d-grid gap-3 mx-auto">
          <button type="submit" className="btn btn-primary mr-2">Login</button>
          <button
            type="button"
            className="btn btn-light mr-2"
            style={{ border: '1px solid black' }}
            onClick={() => navigate('/register')}
          >
            New User
          </button>
        </div>
      </form>
      <div className="auth-message">{message || infoMessage}</div>
    </div>
  );
}
