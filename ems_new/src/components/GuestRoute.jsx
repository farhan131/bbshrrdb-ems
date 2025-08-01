import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../pages/auth';

const GuestRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (token) {
    // Already logged in
    return <Navigate to="/dashboard" replace />;
  }

  // Not logged in, show the child component (login/register)
  return children;
};

export default GuestRoute;
