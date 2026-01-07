import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import Loader from './loader.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div><Loader/></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;