



export default function AdminHeader({ onLogout }) {

  
  return (
    <div className="admin__header">
      <h6 className="admin__title">Панель администратора</h6>
      <button onClick={onLogout}>Выйти</button>
    </div>
  );
}
