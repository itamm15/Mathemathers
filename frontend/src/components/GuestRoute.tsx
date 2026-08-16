import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

function GuestRoute() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
