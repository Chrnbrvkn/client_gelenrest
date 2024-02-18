import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ReserveRoomItem({ room, house, roomPictureUrl, days, calculatePrice }) {
  return (
    <div key={room.id} className="room__item">
      <img style={{ width: '200px' }} src={roomPictureUrl} alt="Комната" />
      <NavLink to={`/houses/${house.id}/rooms/${room.id}`}>
        <p className="house__title">{`${house.name}, Комната ${room.name}`}</p>
      </NavLink>
      <p className="house__title">{`Адрес: ${house.address}`}</p>
      <p className="house__title">{`Количество спальных мест: ${room.roomCount}`}</p>
      <p className="house__title">{`До моря: ${house.timeToSea} минут`}</p>
      <p className="house__title">{`Цена за сутки: ${room.price} рублей`}</p>
      <p className="house__title">{`Общая стоимость за ${days} дней: ${calculatePrice(room.price, days)} рублей`}</p>

      <button onClick={() => {/* функция бронирования */ }}>Забронировать</button>
    </div>
  );
}