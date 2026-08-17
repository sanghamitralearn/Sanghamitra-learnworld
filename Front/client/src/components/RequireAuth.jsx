import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth() {
  const { authenticated, checked } = useAuth();
  const location = useLocation();

  if (!checked) {
    return <div className="container py-5 text-center">Checking session&hellip;</div>;
  }

  if (!authenticated) {
    const redirectPath = encodeURIComponent(location.pathname);
    return <Navigate to={`/login?redirectPath=${redirectPath}`} replace />;
  }

  return <Outlet />;
}
