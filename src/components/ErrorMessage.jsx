import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrorMessage } from '../store/features/errors/errorsSlice';

const ErrorMessage = () => {
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const dispatch = useDispatch();

  if (!errorMessage) return null;

  return (
    <div className="error-message">
      {errorMessage}
      <button onClick={() => dispatch(clearErrorMessage())}>Закрыть</button>
    </div>
  );
};

export default ErrorMessage;
