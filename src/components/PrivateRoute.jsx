import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useData } from '../contexts/DataProvider';
import { validateToken } from '../api/usersApi'; 

const PrivateRoute = ({ element }) => {
  const { authToken, logout } = useData();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthToken = async () => {
      if (authToken) {
        const isValid = await validateToken();
        setIsAuthenticated(isValid);
      } else {
        setIsAuthenticated(false);
      }
      setIsChecking(false); 
    };

    checkAuthToken();
  }, [authToken]);

  if (isChecking) {
    return <div>Проверка аутентификации...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default PrivateRoute;
