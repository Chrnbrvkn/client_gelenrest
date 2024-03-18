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
  // const [rooms, setRooms] = useState([]);
  const { rooms, houses, fetchDataRooms } = useApiData();
  const [currentHouse, setCurrentHouse] = useState({});

  useEffect(() => {
    const findHouse = houses.find(h => h.id === selectedHouseId);
    setCurrentHouse(findHouse);
  }, [selectedHouseId, houses]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const findHouse = (houseId) => {
  //     const house = houses.find(h => h.id === houseId)
  //     setCurrentHouse(house)
  //   }
  //   findHouse(selectedHouseId)

    // const fetchHouseAndRooms = async () => {
    //   if (!selectedHouseId) return;
    //   setIsLoading(true);
    //   try {
    //     const houseData = await getHouse(selectedHouseId);
    //     setCurrentHouse(houseData);
    //     const roomsData = await getRooms(selectedHouseId);
    //     setRooms(roomsData);
    //   } catch (e) {
    //     console.error("Ошибка при получении данных:", e);
    //     setError(e.message);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchHouseAndRooms();
  // }, [selectedHouseId]);

  const handleDeleteRoom = async (houseId, roomId) => {
    await deleteRoom(houseId, roomId);
    fetchDataRooms()
  };

  // if (isLoading) return <div>Загрузка...</div>;
  // if (error) return <div>Ошибка: {error}</div>;

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
