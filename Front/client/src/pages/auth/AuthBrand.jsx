import { Link } from 'react-router-dom';
import './authBrand.css';

// Logo + site name shown on the sign-in pages, which don't use the site header. Links home.
// `plain` drops the white pill, for use inside a white card.
export default function AuthBrand({ plain = false }) {
  return (
    <Link to="/" className={`auth-brand${plain ? ' auth-brand-plain' : ''}`} aria-label="Sanghamitra Learning — home">
      <img src="/img/sbi.logo.png" alt="" width="56" height="56" />
      <span>Sanghamitra Learning</span>
    </Link>
  );
}
