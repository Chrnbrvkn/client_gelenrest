



export default function AdminSidebar({ onSelectTable }) {

  
  return (
    <div className="admin__sidebar">
      <button onClick={() => onSelectTable("booking")} className="admin__sidebar-button">Список броней</button>
      <button onClick={() => onSelectTable("houses")} className="admin__sidebar-button">Список домов</button>
      <button onClick={() => onSelectTable("apartments")} className="admin__sidebar-button">Список квартир</button>
      <button onClick={() => onSelectTable("rooms")} className="admin__sidebar-button">Список комнат</button>
    </div>
  );
}
