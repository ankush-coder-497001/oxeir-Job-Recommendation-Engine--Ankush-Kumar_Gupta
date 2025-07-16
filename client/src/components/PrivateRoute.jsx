import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole = null }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (requiredRole && userRole !== requiredRole) {
      navigate('/');
    }
  }, [token, userRole, requiredRole, navigate]);

  if (!token) return null;
  if (requiredRole && userRole !== requiredRole) return null;

  return children;
};

export default PrivateRoute;
