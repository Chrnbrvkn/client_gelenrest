import RoomItem from "./RoomItem"

export default function RoomListContent({
  currentHouse,
  rooms,
  handleSelectRoom,
  handleEdit,
  onToggleRoomForm,
  handleDeleteRoom,
}) {
  return (

    <div className="houses__list">
      <div className="houses__list-top">
        <p>Список Комнат "{currentHouse.name}"</p>
        <button onClick={onToggleRoomForm} className="houses__list-add">
          Добавить
        </button>
      </div>
      {Array.isArray(rooms) && rooms.length > 0 ? (
        rooms.map(room => (
          <RoomItem
            houseId={currentHouse.id}
            handleSelectRoom={handleSelectRoom}
            handleEdit={handleEdit}
            key={room.id}
            room={room}
            onDelete={handleDeleteRoom}
          />
        ))
      ) : (
        <div>Список комнат пуст</div>
      )}
    </div>
  )
};