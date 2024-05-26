import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../store/features/notification/notificationSlice';
import { useModals } from '../contexts/ModalsProvider';
import '../assets/styles/componentsStyles/notification.css'

const Toast = () => {
  const { callbackModal, bookingModal } = useModals();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  if (!notification.isOpen || callbackModal.isOpen || bookingModal.isOpen) return null;

  const handleClose = () => {
    dispatch(clearNotification());
  };

  return (
    <div className={`toast toast-${notification.type}`}>
      {notification.message}
      <button onClick={handleClose}>Закрыть</button>
    </div>
  );
};

export default Toast;
