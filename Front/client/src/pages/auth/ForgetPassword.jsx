import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import './authForms.css';

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [stage, setStage] = useState('checkEmail'); // checkEmail | resetPassword | notFound
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  async function handleCheckEmail(event) {
    event.preventDefault();
    setMessage('');

    try {
      const response = await apiFetch('/reset-password/check-email', {
        method: 'POST',
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStage('resetPassword');
      } else {
        setMessage('Email not found.');
        setStage('notFound');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  }

  async function handleResetPassword(event) {
    event.preventDefault();
    setMessage('');

    try {
      const response = await apiFetch('/reset-password/set-new-password', {
        method: 'POST',
        body: JSON.stringify({ email, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/login?message=${encodeURIComponent(`Password has been reset successfully for ${email}. Please login.`)}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  }

  return (
    <div className="auth-page">
      <h1>Forgot Password</h1>

      {stage === 'checkEmail' && (
        <div className="form-container">
          <form onSubmit={handleCheckEmail}>
            <div>
              <label htmlFor="email">Current Email:</label>
              <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <button type="submit">Check Email</button>
            </div>
          </form>
        </div>
      )}

      {stage === 'resetPassword' && (
        <div className="form-container">
          <form onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="emailDisplay">Email:</label>
              <input type="email" id="emailDisplay" name="emailDisplay" disabled value={email} />
            </div>
            <div>
              <label htmlFor="new-password">New Password:</label>
              <div className="show-password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="new-password"
                  name="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <input type="checkbox" id="show-password" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} /> Show Password
              </div>
            </div>
            <div>
              <button type="submit">Reset Password</button>
            </div>
          </form>
        </div>
      )}

      {stage === 'notFound' && (
        <div className="form-container">
          <button onClick={() => navigate('/register')}>Create New Account</button>
        </div>
      )}

      <div className="auth-message">{message}</div>
    </div>
  );
}
