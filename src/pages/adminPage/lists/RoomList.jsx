import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHousesAsync } from '../../../store/features/lists/houses/housesFetch';
import { fetchRoomsAsync, deleteRoomAsync } from '../../../store/features/lists/rooms/roomsFetch';
import RoomListHouseSelection from "./RoomListHouseSelection";
import RoomListContent from "./RoomListContent";
import AddRoomForm from "../add/AddRoomForm";

export default function RoomList() {
  const dispatch = useDispatch();
  const { selectedHouseId } = useSelector(state => state.adminPage);
  const houses = useSelector(state => state.houses.data);
  const rooms = useSelector(state => state.rooms.data[selectedHouseId]);
  const showForm = useSelector(state => state.adminPage.formState);

  useEffect(() => {
    dispatch(fetchHousesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (selectedHouseId) {
      dispatch(fetchRoomsAsync(selectedHouseId));
    }
  }, [dispatch, selectedHouseId]);

  const handleSelectHouse = (houseId) => {
    dispatch({ type: 'adminPage/setSelectedHouseId', payload: houseId });
  };

  const handleDeleteRoom = (roomId) => {
    dispatch(deleteRoomAsync({ houseId: selectedHouseId, roomId }));
  };

  return (
    <>
      {!selectedHouseId ? (
        <RoomListHouseSelection houses={houses} onHouseSelect={handleSelectHouse} />
      ) : showForm ? (
        <AddRoomForm />
      ) : (
        <RoomListContent
          currentHouse={houses.find(house => house.id === selectedHouseId)}
          rooms={rooms}
          onDeleteRoom={handleDeleteRoom}
        />
      )}
    </>
  );
}
