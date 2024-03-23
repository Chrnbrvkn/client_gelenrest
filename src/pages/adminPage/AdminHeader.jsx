



export default function AdminHeader({ onLogout }) {


  return (
    <div className="admin__header">
      <button className="admin__logout_btn" onClick={onLogout}>Выйти</button>
        <h6 className="admin__title">Панель администратора</h6>
    </div>
  );
}
