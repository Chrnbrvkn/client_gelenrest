import { useDispatch } from 'react-redux';
import { deleteRoomAsync, fetchRoomsAsync } from '../../../store/features/lists/rooms/roomsFetch';
import { setNotification } from '../../../store/features/notification/notificationSlice';





export default function RoomItem({
  room,
  houseId,
  onEdit,
}) {
  const dispatch = useDispatch();


  const handleDeleteRoom = async (roomId) => {
    const roomName = room.name;
    try {
      dispatch(deleteRoomAsync({ roomId: roomId, houseId: houseId }));
      dispatch(setNotification({
        message: `Комната ${roomName} удалена.`,
        type: 'success',
      }));

      await dispatch(fetchRoomsAsync(houseId)).unwrap();
    } catch (e) {
      dispatch(setNotification({
        message: `Ошибка при удалении комнаты ${roomName}. 
        ${e.message}`,
        type: 'error',
      }))
      console.log(e);
    }
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
        <button className="houses__list-delete"
          onClick={() => handleDeleteRoom(room.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}
