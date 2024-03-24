import React from 'react';
import RoomItem from "../items/RoomItem";

export default function RoomListContent({
  currentHouse,
  rooms,
  onToggleRoomForm,
  onEditRoom,
  onDeleteRoom,
}) {
  return (
    <div className="rooms__list">
      <div className="rooms__list-top">
        <p>Список комнат в доме: {currentHouse.name}</p>
        <button onClick={onToggleRoomForm} className="rooms__list-add">
          Добавить комнату
        </button>
      </div>
      {currentHouse && rooms && rooms.length > 0 ? (
        rooms.map(room => (
          <RoomItem
            key={room.id}
            room={room}
            houseId={currentHouse.id}
            onEdit={onEditRoom}
            onDelete={onDeleteRoom}
          />
        ))
      ) : (
        <div>Список комнат пуст</div>
      )}
    </div>
  );
}
