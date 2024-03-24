import { useDispatch } from 'react-redux';
import { deleteRoomAsync } from '../../../store/features/lists/rooms/roomsFetch';
export default function RoomItem({
  room,
  houseId,
  onEdit
}) {
  const dispatch = useDispatch();


  const handleDeleteRoom = (roomId) => {
    dispatch(deleteRoomAsync({ roomId: roomId, houseId: houseId }));
  };

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
        <button className="houses__list-delete" onClick={() => handleDeleteRoom(room.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}
