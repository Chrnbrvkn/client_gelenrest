
export default function RoomItem({
  houseId,
  handleSelectRoom,
  handleEdit,
  room,
  onDelete,
}) {
  const TYPE = 'room'
  const handleClickEdit = () => {
    handleSelectRoom(room.id)
    handleEdit(room.id, TYPE, houseId)
  }
  return (
    <div key={room.id}>
      <a className="houses__list-item">
        {room.name}
      </a>
      <div className="home__redact-buttons">
        <button onClick={handleClickEdit}
          className="houses__list-update">
          Изменить
        </button>
        <button className="houses__list-delete" onClick={() => onDelete(room.id)}>
          Удалить
        </button>
      </div>
    </div>
  )
}
