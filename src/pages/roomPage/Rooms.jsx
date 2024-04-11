import React, { useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useApiData } from '../../contexts/ApiProvider';
import '../../assets/styles/pagesStyles/room.css';
import '../../assets/styles/pagesStyles/house.css';

import RoomDetails from './RoomDetails';
import RoomCard from './RoomCard';
import altPicture from '/src/assets/images/homeCards/home-1.png'

import { useDispatch, useSelector } from 'react-redux'

import { fetchHousesAsync } from '../../store/features/lists/houses/housesFetch';

import LoadingSpinner from '../../components/LoadingSpinner';

import { fetchAllRoomsAsync } from '../../store/features/lists/rooms/roomsFetch';

import useScrollTop from '../../hooks/useScrollTop';

export default function Rooms() {
  useScrollTop()
  const { houseId, roomId } = useParams();

  const houses = useSelector(state => state.houses.data);
  const rooms = useSelector(state => state.rooms.allRooms);
  const isLoading = useSelector(state => state.loading.isLoading);

  const dispatch = useDispatch()

  useEffect(_ => {
    dispatch(fetchHousesAsync())
    dispatch(fetchAllRoomsAsync())
  }, [dispatch])

  const house = houses.find(h => h.id === parseInt(houseId));
  const currentRoom = rooms.find(r => r.id === parseInt(roomId));
  // const roomImages = roomsPictures.filter(pic => pic.roomId === parseInt(roomId));
  const otherRooms = rooms.filter(room => room.houseId === parseInt(houseId) && room.id !== parseInt(roomId));


  function getRoomImages(roomImages) {
    if (roomImages && roomImages.length > 0) {
      return roomImages.map(img => `https://api.gelenrest.ru${img.url}`);
    } else {
      return [altPicture];
    }
  }

  
  if (isLoading) {
    return <LoadingSpinner />;
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
          <RoomDetails room={currentRoom}
            roomImages={getRoomImages(currentRoom.images)} />
        ) : (
          <div>Комната не найдена</div>
        )}
        <div className="room__items">
          {otherRooms.map((room, index) => (
            <RoomCard key={index} room={room} roomImages={getRoomImages(room.images)}/>
          ))}
        </div>
      </div>
    </div>
  );
}
