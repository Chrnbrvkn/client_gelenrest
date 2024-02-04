import React, { useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useApiData } from '../../contexts/ApiProvider';
import '../../assets/styles/pagesStyles/room.css';
import '../../assets/styles/pagesStyles/house.css';

import RoomDetails from './RoomDetails';
import RoomCard from './RoomCard';
import { useData } from '../../contexts/DataProvider';
import useScrollTop from '../../hooks/useScrollTop';

export default function Rooms() {
  useScrollTop()
  const { houseId, roomId } = useParams();
  const { isLoading } = useData()
  const { rooms, roomsPictures, houses } = useApiData();

  const house = houses.find(h => h.id === parseInt(houseId));
  const currentRoom = rooms.find(r => r.id === parseInt(roomId));
  const roomImages = roomsPictures.filter(pic => pic.roomId === parseInt(roomId));
  const otherRooms = rooms.filter(room => room.houseId === parseInt(houseId) && room.id !== parseInt(roomId));

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className='room'>
      <div className="container">
        <ul className="breadcrumb">
          <li className="breadcrumb__item"><NavLink to={`/houses`}>Список домов</NavLink></li>
          <li className="breadcrumb__item"><NavLink to={`/houses/${houseId}`}>{house?.name}</NavLink></li>
          <li className="breadcrumb__item">Комната: {currentRoom?.name}</li>
        </ul>
        {currentRoom ? (
          <RoomDetails room={currentRoom} roomImages={roomImages} />
        ) : (
          <div>Комната не найдена</div>
        )}
        <div className="room__items">
          {otherRooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}
