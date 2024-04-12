import RoomItem from "../items/RoomItem";
import { useDispatch, useSelector } from "react-redux";
import { showForm, hideForm } from '../../../store/features/pages/adminSlice';
// import ErrorMessage from "../../../components/ErrorMessage";
import LoadingSpinner from '../../../components/LoadingSpinner'
import { fetchAllRoomsAsync } from "../../../store/features/lists/rooms/roomsFetch";



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
        <LoadingSpinner/>
      ) : (
        <div className="rooms__list">
          <div className="rooms__list-top">
            <p>Список комнат в доме: {currentHouse.name}</p>
            <button
              onClick={handleAddRoomForm} className="houses__list-update">
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
