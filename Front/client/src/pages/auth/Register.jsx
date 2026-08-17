import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import './authForms.css';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    try {
      const response = await apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/login?message=${encodeURIComponent(`Registration successful for ${name}. Please login.`)}`);
      } else {
        setMessage(`Registration failed: ${data.error || data.message}`);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  }

  return (
    <div className="auth-page">
      <h1>User Registration</h1>
      <form id="registrationForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            minLength={8}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input type="checkbox" id="showPassword" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} /> Show Password
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <div className="auth-message">{message}</div>
    </div>
  );
}
