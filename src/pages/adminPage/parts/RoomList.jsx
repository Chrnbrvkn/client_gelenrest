import { useState, useEffect } from "react";
import { getRooms, deleteRoom } from "../../../api/roomsApi";
import AddRoomForm from "./AddRoomForm";
import { getHouse } from "../../../api/housesApi";
import RoomListHouseSelection from "./RoomListHouseSelection";
import RoomListContent from "./RoomListContent";

export default function RoomList({
  handleEdit,
  selectedHouseId,
  handleSelectRoom,
  handleSelectHouse,
  roomFormData,
  onChange,
  houses,
  showRoomForm,
  onToggleRoomForm,
}) {
  const [rooms, setRooms] = useState([]);
  const [currentHouse, setCurrentHouse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouseAndRooms = async () => {
      if (!selectedHouseId) return;
      setIsLoading(true);
      try {
        const houseData = await getHouse(selectedHouseId);
        setCurrentHouse(houseData);
        const roomsData = await getRooms(selectedHouseId);
        setRooms(roomsData);
      } catch (e) {
        console.error("Ошибка при получении данных:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHouseAndRooms();
  }, [selectedHouseId]);

  const handleDeleteRoom = async (houseId, roomId) => {
    await deleteRoom(houseId, roomId);
    setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      {!selectedHouseId ? (
        <RoomListHouseSelection houses={houses} handleSelectHouse={handleSelectHouse} />
      ) : (
        <>
          {showRoomForm ? (
            <AddRoomForm
              houseName={currentHouse.name}
              selectedHouseId={selectedHouseId}
              roomFormData={roomFormData}
              onChange={onChange}
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
