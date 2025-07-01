import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/store';

const ProtectedRoute = () => {
  const token = useAuth((s) => s.token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
