import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginPage = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Checking session..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <LoginForm />;
};

export default LoginPage;
