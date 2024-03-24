import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedTable, hideForm, setSelectedHouseId } from '../../store/features/pages/adminSlice';


const ADMIN_PAGE_LISTS = ['броней', 'домов', 'квартир', 'комнат'];

export default function AdminSidebar() {
  const dispatch = useDispatch();

  const handleSelectTable = (tableName) => {
    dispatch(hideForm());
    dispatch(setSelectedTable(tableName));

    if (tableName === 'комнат') {
      dispatch(setSelectedHouseId(null));
    }
  };

  return (
    <div className="admin__sidebar">
      {ADMIN_PAGE_LISTS.map((tableName) => (
        <button
          key={tableName}
          onClick={() => handleSelectTable(tableName)}
          className="admin__sidebar-button">
          {`Список ${tableName}`}
        </button>
      ))}
    </div>
  );
}
