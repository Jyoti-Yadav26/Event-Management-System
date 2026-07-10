import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import { getRoleHomePath } from '../../utils/helpers';

const ProtectedRoute = ({ allowedRoles, guestOnly = false }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (guestOnly) {
    if (isAuthenticated) {
      return <Navigate to={getRoleHomePath(user?.role)} replace />;
    }
    return <Outlet />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    return <Navigate to={getRoleHomePath(user?.role)} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
