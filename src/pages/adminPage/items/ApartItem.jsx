export default function ApartItem({ apart, onEdit, onDelete }) {
  return (
    <div className="houses__list-item--content">
      <div className="houses__list-item">{apart.name}</div>
      <div className="home__redact-buttons">
        <button onClick={onEdit} className="houses__list-update">Изменить</button>
        <button onClick={() => onDelete(apart.id)} className="houses__list-delete">Удалить</button>
      </div>
    </div>
  );
}
