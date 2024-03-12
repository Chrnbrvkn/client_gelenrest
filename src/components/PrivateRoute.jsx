import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useData } from '../contexts/DataProvider';


const PrivateRoute = ({ element }) => {
  const { authToken } = useData();

  // useEffect(() => {
  //   console.log(authToken);
  // },[])

  const location = useLocation();

  if (!authToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return element;
};

export default PrivateRoute;
