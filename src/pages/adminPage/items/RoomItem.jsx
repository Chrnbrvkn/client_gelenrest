
export default function RoomItem({
  houseId,
  handleSelectRoom,
  handleEdit,
  room,
  onDelete,
  
}) {

  return (
    <div className="houses__list-item--content" key={room.id}>
      <a className="houses__list-item">
        {room.name}
      </a>
      <div className="home__redact-buttons">
        <button onClick={handleClickEdit}
          className="houses__list-update">
          Изменить
        </button>
        <button className="houses__list-delete" onClick={() => onDelete(houseId,room.id)}>
          Удалить
        </button>
      </div>
    </div>
  )
}
