// src/privateRoute/privateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("user_id");

  // Function to logout the user
  const logout = async () => {
    try {
      const response = await fetch('https://quizifai.com:8010/usr_logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id")
        })
      });
      if (response.ok) {
        localStorage.removeItem("user_id");
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Add event listener to handle window close/navigate away
  React.useEffect(() => {
    const handleWindowClose = () => {
      logout();
    };

    window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, []);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
