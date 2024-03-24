import RoomItem from "../items/RoomItem";
import { useDispatch, useSelector } from "react-redux";
import EditRoom from "../edit/EditRoom";
import { showForm, hideForm } from '../../../store/features/pages/adminSlice';


export default function RoomListContent({
  currentHouse,
  rooms,
}) {

  const dispatch = useDispatch();
  const formState = useSelector((state) => state.adminPage.formState);
  const isLoading = useSelector((state) => state.loading.isLoading);

  const handleAddRoomForm = () => {
    if (formState.isOpen) {
      dispatch(hideForm());
    } else {
      dispatch(showForm({ type: 'add', itemId: null }));
    }
  };

  const handleEditRoomForm = (roomId) => {
    dispatch(showForm({ type: 'edit', itemId: roomId }));
  }

  return (

    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="rooms__list">
          <div className="rooms__list-top">
            <p>Список комнат в доме: {currentHouse.name}</p>
            <button
              onClick={handleAddRoomForm} className="rooms__list-add">
              Добавить комнату
            </button>
          </div>
          {currentHouse && rooms && rooms.length > 0 ? (
            rooms.map(room => (
              <RoomItem
                key={room.id}
                room={room}
                houseId={currentHouse.id}
                onEdit={handleEditRoomForm}
              />
            ))
          ) : (
            <div>Список комнат пуст</div>
          )}
        </div>
      )}
    </>
  );
}
