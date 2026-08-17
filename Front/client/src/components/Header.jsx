import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { authenticated, checked, logout } = useAuth();
  const navigate = useNavigate();

  async function handleAuthClick(event) {
    event.preventDefault();
    if (authenticated) {
      const confirmLogout = window.confirm('Do you really want to logout?');
      if (!confirmLogout) return;
      const ok = await logout();
      if (ok) {
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } else {
      navigate('/login');
    }
  }

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto">
          <h1 className="">
            <img src="/img/sbi.logo.png" alt="company logo" width="80" height="80" />
            Sanghamitra Learning
          </h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>
              {checked && (
                <button
                  type="button"
                  id="authButton"
                  className={`btn ${authenticated ? 'btn-danger' : 'btn-success'}`}
                  onClick={handleAuthClick}
                >
                  {authenticated ? 'Logout' : 'Login'}
                </button>
              )}
            </li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </header>
  );
}
