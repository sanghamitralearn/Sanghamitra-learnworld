import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import AuthBrand from './AuthBrand';
import './Login.css';

function LoginIllustration() {
  return (
    <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* decorative squiggles + circles */}
      <path d="M30 80c12-14 22 14 34 0s22 14 34 0 22 14 34 0" stroke="#062e20" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 200c10-12 20 12 30 0s20 12 30 0" stroke="#062e20" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="50" r="5" stroke="#062e20" strokeWidth="2" />
      <circle cx="340" cy="215" r="5" stroke="#062e20" strokeWidth="2" />

      {/* clock */}
      <circle cx="290" cy="60" r="26" fill="#fff" stroke="#062e20" strokeWidth="2.5" />
      <path d="M290 42v18l12 8" stroke="#062e20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* ground line */}
      <line x1="20" y1="330" x2="380" y2="330" stroke="#062e20" strokeWidth="2" />

      {/* stack of books */}
      <rect x="70" y="290" width="200" height="40" rx="4" fill="#5fcf80" stroke="#062e20" strokeWidth="2" />
      <rect x="85" y="250" width="175" height="40" rx="4" fill="#14865a" stroke="#062e20" strokeWidth="2" />
      <rect x="75" y="210" width="190" height="40" rx="4" fill="#fff" stroke="#062e20" strokeWidth="2" />
      <line x1="90" y1="302" x2="250" y2="302" stroke="#062e20" strokeWidth="1.5" opacity="0.4" />
      <line x1="100" y1="262" x2="240" y2="262" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
      <line x1="90" y1="222" x2="245" y2="222" stroke="#062e20" strokeWidth="1.5" opacity="0.3" />

      {/* legs */}
      <path d="M185 205c30 0 60 5 85 20l25 70" stroke="#062e20" strokeWidth="2" fill="#fff" />
      <path d="M180 210h70c20 0 30 12 35 25l22 60h-22l-25-55h-80z" fill="#fff" stroke="#062e20" strokeWidth="2" strokeLinejoin="round" />
      {/* shoes */}
      <path d="M285 295h26c6 0 8 8 2 10h-30z" fill="#062e20" />

      {/* body / shirt */}
      <path d="M160 140c5-12 40-14 50 0l8 70h-66z" fill="#0f6b47" stroke="#062e20" strokeWidth="2" strokeLinejoin="round" />
      <path d="M170 160l6 4M190 155l-3 6M200 175l6 2M175 185l4 5M195 195l-5 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />

      {/* neck + head */}
      <rect x="178" y="122" width="14" height="18" fill="#fff" stroke="#062e20" strokeWidth="2" />
      <circle cx="186" cy="106" r="22" fill="#fff" stroke="#062e20" strokeWidth="2" />
      {/* hair */}
      <path d="M164 104c-2-20 14-32 30-28 12 3 18 12 16 22-8-6-20-8-30-6-6 2-12 6-16 12z" fill="#062e20" />
      <circle cx="200" cy="78" r="8" fill="#062e20" />
      {/* glasses */}
      <circle cx="182" cy="108" r="5" stroke="#062e20" strokeWidth="1.8" />
      <circle cx="196" cy="108" r="5" stroke="#062e20" strokeWidth="1.8" />
      <line x1="187" y1="108" x2="191" y2="108" stroke="#062e20" strokeWidth="1.8" />

      {/* laptop */}
      <path d="M222 128l18 60h-8l-18-60z" fill="#34c07f" stroke="#062e20" strokeWidth="2" strokeLinejoin="round" />
      <path d="M190 190h50" stroke="#062e20" strokeWidth="3" strokeLinecap="round" />

      {/* arm */}
      <path d="M200 150c10 20 20 30 30 32" stroke="#062e20" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="231" cy="182" r="4" fill="#fff" stroke="#062e20" strokeWidth="2" />
    </svg>
  );
}

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
    <div className="login-page">
      <div className="login-card">
        <div className="login-art">
          <LoginIllustration />
        </div>

        <div className="login-form-side">
          <AuthBrand plain />
          <h1>User Login</h1>
          <p className="login-subtitle">Enter your details to sign in to your account</p>

          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="login-field">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-field">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
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

            <div className="login-row">
              <label htmlFor="showPassword">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                Show Password
              </label>
              <Link to="/forget-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="login-btn login-btn-primary">Login</button>
            <button type="button" className="login-btn login-btn-secondary" onClick={() => navigate('/register')}>
              New User
            </button>
          </form>

          <div className={`login-message${!message && infoMessage ? ' info' : ''}`}>{message || infoMessage}</div>
        </div>
      </div>
    </div>
  );
}
