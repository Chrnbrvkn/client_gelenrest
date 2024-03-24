import React, { useEffect, useState } from 'react'
import { useApiData } from '../../contexts/ApiProvider';

import { useData } from '../../contexts/DataProvider'
import useReserveFilter from '../../hooks/useReserveFilter';
import { NavLink } from 'react-router-dom';
import ReserveRoomItem from './ReserveRoomItem';
import ReserveApartItem from './ReserveApartItem';

import alterPicture from '../../assets/images/homeCards/home-1.png'

export default function ReserveItemsList({ ...props }) {
  const { isLoading } = useData()
  const { rooms, aparts, booking, houses, housesPictures, apartsPictures, roomsPictures } = useApiData();
  const { reserveFilter } = useReserveFilter()

  const [isEmptyList, setIsEmptyList] = useState(false)


  useEffect(() => {
    console.log('HOUSES: ', houses);
    console.log('APARTS: ', aparts);
    console.log('ROOMS: ', rooms);
    console.log('BOOKINGs: ', booking);
  })



  const availableRooms = rooms.filter(room => reserveFilter(room, props));
  const availableAparts = aparts.filter(apart => reserveFilter(apart, props));
  console.log(availableRooms);
  console.log(availableAparts);

  const calculateDays = (checkInDate, checkOutDate) => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };
  const calculatePrice = (pricePerDay, days) => {
    if (days < 10) {
      return Math.round(pricePerDay * days);
    } else if (days < 20) {
      return Math.round(pricePerDay * days * 0.95);
    } else {
      return Math.round(pricePerDay * days * 0.8);
    }
  };
  
  const findHouse = (room) => {
    return houses.find(house => house.id === room.houseId);
  };


  if (isLoading) (
    <p>Загрузка</p>
  )
  // if (!availableRooms.length && !availableAparts.length) {
  //   return <p>Нет доступных номеров или апартаментов.</p>;
  // }
  // if (isEmptyList) {
  //   return <p>Нет доступных номеров или апартаментов.</p>;
  // }
  // if (props.isFindRooms && availableRooms.length === 0 && availableAparts.length === 0) {
  //   return <p>Нет доступных номеров на это время.</p>;
  // }
  return (
    <>
      <h2 className="title">Список подходящих номеров:</h2>
      <div className="reserveItems-list">

        {availableRooms.map(room => (
          <ReserveR oomItem
            key={room.id}
            room={room}
            house={findHouse(room)}
            roomPictureUrl={`https://api.gelenrest.ru${roomsPictures.find(p => p.roomId === room.id)?.url || alterPicture}`}
            days={calculateDays(props.checkInDate, props.checkOutDate)}
            calculatePrice={calculatePrice}
          />
        ))}
        {availableAparts.map(apart => (
          <ReserveApartItem
            key={apart.id}
            apart={apart}
            apartPictureUrl={`https://api.gelenrest.ru${apartsPictures.find(p => p.apartId === apart.id)?.url || alterPicture}`}
            days={calculateDays(props.checkInDate, props.checkOutDate)}
            calculatePrice={calculatePrice}
          />
        ))}
      </div>
    </>
  )
}
