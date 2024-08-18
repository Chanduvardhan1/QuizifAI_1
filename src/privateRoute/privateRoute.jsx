import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../Authcontext/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) {
    // Optional: Add a loading indicator while checking authentication state
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
