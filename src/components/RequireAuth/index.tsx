import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export const RequireAuth = () => {
  const hasUser = Cookies.get('auth_token');
  const location = useLocation();

  return hasUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
