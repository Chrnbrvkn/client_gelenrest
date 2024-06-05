import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHousesAsync } from '../../../store/features/lists/houses/housesFetch';
import { fetchAllRoomsAsync, fetchRoomsAsync } from '../../../store/features/lists/rooms/roomsFetch';
import { setSelectedHouseId, hideForm } from '../../../store/features/pages/adminSlice';
import RoomListHouseSelection from "./RoomListHouseSelection";
import RoomListContent from "./RoomListContent";
import AddRoomForm from "../add/AddRoomForm";
import EditRoom from "../edit/EditRoom";
// import ErrorMessage from '../../../components/ErrorMessage';
import LoadingSpinner from '../../../components/LoadingSpinner';


export default function RoomList() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loading.isLoading);

  const formState = useSelector(state => state.adminPage.formState);
  const selectedHouseId = useSelector(state => state.adminPage.selectedHouseId);

  const houses = useSelector(state => state.houses.data);
  const currentHouse = houses.find(house => house.id === selectedHouseId);

  const allRooms = useSelector(state => state.rooms.data);

  const rooms = useMemo(() => {
    return allRooms.filter(room => room.houseId === selectedHouseId);
  }, [allRooms, selectedHouseId]);


  useEffect(() => {
    dispatch(fetchHousesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (selectedHouseId) {
      dispatch(fetchRoomsAsync(selectedHouseId));
    }

  }, [dispatch, selectedHouseId]);

  const handleSelectHouse = (houseId) => {
    dispatch(setSelectedHouseId(houseId));
  };

  // const handleDeleteRoom = async (roomId) => {
  //   const roomName = rooms.find(r => r.id === roomId).name;
  //   try {
  //     dispatch(deleteRoomAsync({ roomId: roomId, houseId: selectedHouseId }));
  //     dispatch(setNotification({
  //       message: `Комната ${roomName} удалена.`,
  //       type: 'success',
  //     }));
  //     await dispatch(fetchRoomsAsync(selectedHouseId)).unwrap();
  //   } catch (e) {
  //     dispatch(setNotification({
  //       message: `Ошибка при удалении комнаты ${roomName}. 
  //       ${e.message}`,
  //       type: 'error',
  //     }))
  //     console.log(e);
  //   }
  // };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : (
        !selectedHouseId ? (
          <RoomListHouseSelection
            houses={houses}
            onHouseSelect={handleSelectHouse}
            
          />
        ) : formState.isOpen && formState.type === 'add' ? (
          <AddRoomForm
            onCancel={() => dispatch(hideForm())}
          />
        ) : formState.isOpen && formState.type === 'edit' ? (
          <EditRoom
            roomId={formState.itemId}
            onCancel={() => dispatch(hideForm())}
            rooms={rooms}
          />
        ) : (
          <RoomListContent
            currentHouse={currentHouse}
            rooms={rooms}
          />
        )
      )}
    </>
  );
}
