import { useState, useEffect } from "react";
import { getRooms, deleteRoom } from "../../../api/roomsApi";
import AddRoomForm from "../add/AddRoomForm";
import { getHouse } from "../../../api/housesApi";
import RoomListHouseSelection from "./RoomListHouseSelection";
import RoomListContent from "./RoomListContent";
import { useApiData } from "../../../contexts/ApiProvider";

export default function RoomList({
  handleEdit,
  selectedHouseId,
  handleSelectRoom,
  handleSelectHouse,
  roomFormData,
  onChange,
  showRoomForm,
  onToggleRoomForm,
}) {
  
  const { rooms, houses, fetchDataRooms } = useApiData();
  const [currentHouse, setCurrentHouse] = useState({});

  useEffect(() => {
    const findHouse = houses.find(h => h.id === selectedHouseId);
    setCurrentHouse(findHouse);
  }, [selectedHouseId, houses]);

    const handleDeleteRoom = async (houseId, roomId) => {
    await deleteRoom(houseId, roomId);
    fetchDataRooms()
  };

  return (
    <>
      {!selectedHouseId ? (
        <RoomListHouseSelection houses={houses} handleSelectHouse={handleSelectHouse} />
      ) : (
        <>
          {showRoomForm ? (
            <AddRoomForm
              currentHouse={currentHouse}
              selectedHouseId={selectedHouseId}
              roomFormData={roomFormData}
              onChange={onChange}
              onToggleRoomForm={onToggleRoomForm}
            />
          ) : (
            <RoomListContent
              currentHouse={currentHouse}
              rooms={rooms}
              handleSelectRoom={handleSelectRoom}
              handleEdit={handleEdit}
              onToggleRoomForm={onToggleRoomForm}
              handleDeleteRoom={handleDeleteRoom}
            />
          )}
        </>
      )}
    </>
  );
}
