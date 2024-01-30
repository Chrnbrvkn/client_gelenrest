import React, { useState, useEffect } from 'react'
import AddBookingForm from './AddBookingForm'
import { getAllRooms } from '../../../api/roomsApi';
import { useApartsData } from '../../../contexts/ApiProvider';
import { useData } from '../../../contexts/DataProvider';
import { useAdmin } from '../../../contexts/AdminProvider';


export default function ItemsList({ onToggleBookingForm, bookingFormData, onChange, onFetchBooking }) {
  const { isLoading } = useData()
  const { aparts, fetchDataAparts } = useApartsData();
  const { setSelectedItem, viewState, setViewState } = useAdmin();

  const handleSelectItem = (item) => {
    console.log("Selecting item:", item);
    setSelectedItem(item);
    setViewState('form');
  };

  const [rooms, setRooms] = useState([])

  const fetchRoomsData = async () => {
    const fetchedRooms = await getAllRooms()
    setRooms(fetchedRooms)
  }

  useEffect(() => {
    fetchDataAparts();
    fetchRoomsData();
  }, []);

  return (
    <div> Выберите квартиру или комнату для добавления брони
      <div>Комнаты:</div>
      {rooms.map(room => (
        <button key={room.id}
          onClick={() => handleSelectItem({
            houseId: room.houseId,
            itemId: room.id,
            itemType: 'room'
          })}
        >{room.name}</button>
      ))}
      <div>Квартиры:</div>
      {aparts.map(apart => (
        <button key={apart.id}
          onClick={() => handleSelectItem({
            houseId: null,
            itemId: apart.id,
            itemType: 'apart'
          })}
        >{apart.name}</button>
      ))}
      {/* <AddBookingForm
        bookingFormData={bookingFormData}
        onChange={onChange}
        onBookingAdded={onFetchBooking}
      /> */}
    </div>
  )
}
