import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { validateTokenAsync } from '../store/features/auth/authThunk.js';
import { logout } from '../store/features/auth/authSlice';

const PrivateRoute = ({ element }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  // Получаем authToken и состояние аутентификации из Redux store
  const { authToken, isAuthenticated } = useSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthToken = async () => {
      if (authToken) {
        // Пытаемся проверить токен через асинхронный экшн
        try {
          await dispatch(validateTokenAsync(authToken)).unwrap();
          // Если токен валиден, Redux store будет обновлен автоматически
        } catch {
          // Если токен невалиден, можно здесь вызвать logout
          dispatch(logout());
        }
      }
      setIsChecking(false);
    };

    checkAuthToken();
  }, [authToken, dispatch]);

  if (isChecking) {
    return <div>Проверка аутентификации...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default PrivateRoute;
