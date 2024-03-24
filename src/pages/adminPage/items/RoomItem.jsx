export default function RoomItem({
  room,
  houseId,
  onEdit,
  onDelete,
}) {
  return (
    <div className="houses__list-item--content">
      <div className="houses__list-item">
        {room.name}
      </div>
      <div className="home__redact-buttons">
        <button onClick={() => onEdit(room.id)}
          className="houses__list-update">
          Изменить
        </button>
        <button className="houses__list-delete" onClick={() => onDelete(houseId,room.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}
