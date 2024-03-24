import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHousesAsync } from '../../../store/features/lists/houses/housesFetch';
import { fetchRoomsAsync, deleteRoomAsync } from '../../../store/features/lists/rooms/roomsFetch';
import { setSelectedHouseId, showForm, hideForm } from '../../../store/features/pages/adminSlice';
import RoomListHouseSelection from "./RoomListHouseSelection";
import RoomListContent from "./RoomListContent";
import AddRoomForm from "../add/AddRoomForm";

export default function RoomList() {
  const dispatch = useDispatch();
  const selectedHouseId = useSelector(state => state.adminPage.selectedHouseId);
  const formState = useSelector(state => state.adminPage.formState);
  const houses = useSelector(state => state.houses.data);
  const rooms = useSelector(state => state.rooms.roomsByHouseId[selectedHouseId]);

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

  const onToggleRoomForm = () => {
    if (formState.isOpen) {
      dispatch(hideForm());
    } else {
      dispatch(showForm({ type: 'add', itemId: null }));
    }
  };
  const handleDeleteRoom = (roomId) => {
    dispatch(deleteRoomAsync({ houseId: selectedHouseId, roomId }))
  }

  const handleEditRoom = (roomId) => {
    dispatch(showForm({ type: 'edit', itemId: roomId }))
  }

  return (
    <>
      {!selectedHouseId ? (
        <RoomListHouseSelection houses={houses} onHouseSelect={handleSelectHouse} />
      ) : formState.isOpen ? (
        <AddRoomForm onCancel={() => dispatch(hideForm())} />
      ) : (
        <RoomListContent
          currentHouse={houses.find(house => house.id === selectedHouseId)}
          rooms={rooms}
          onToggleRoomForm={onToggleRoomForm}
          onEditRoom={handleEditRoom}
          onDeleteRoom={handleDeleteRoom}
        />
      )}
    </>
  );
}
