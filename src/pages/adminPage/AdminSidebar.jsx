import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedTable } from '../../store/features/pages/adminSlice';

export default function AdminSidebar() {
  const dispatch = useDispatch();

  return (
    <div className="admin__sidebar">
      <button
        onClick={() => dispatch(setSelectedTable('booking'))}
        className="admin__sidebar-button">
        Список броней
      </button>
      <button
        onClick={() => dispatch(setSelectedTable('houses'))}
        className="admin__sidebar-button">
        Список домов
      </button>
      <button
        onClick={() => dispatch(setSelectedTable('aparts'))}
        className="admin__sidebar-button">
        Список квартир
      </button>
      <button
        onClick={() => dispatch(setSelectedTable('rooms'))}
        className="admin__sidebar-button">
        Список комнат
      </button>
    </div>
  );
}
