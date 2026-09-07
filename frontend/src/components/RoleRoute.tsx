import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

function RoleRoute({ roles }: { roles: string[] }) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
