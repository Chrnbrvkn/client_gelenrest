import { useDispatch } from 'react-redux';



export default function AdminSidebar() {
  const dispatch = useDispatch();

  return (
    <div className="admin__sidebar">
      <button
        onClick={() => dispatch({ type: 'SELECT_TABLE', payload: 'booking' })} className="admin__sidebar-button">
        Список броней
      </button>
      <button
        onClick={() => dispatch({ type: 'SELECT_TABLE', payload: 'houses' })} className="admin__sidebar-button">
        Список домов
      </button>
      <button
        onClick={() => dispatch({ type: 'SELECT_TABLE', payload: 'aparts' })} className="admin__sidebar-button">
        Список квартир
      </button>
      <button
        onClick={() => dispatch({ type: 'SELECT_TABLE', payload: 'rooms' })} className="admin__sidebar-button">
        Список комнат
      </button>
    </div>
  );
}
