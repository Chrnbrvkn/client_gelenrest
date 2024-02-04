import React from 'react'
import { NavLink } from 'react-router-dom'

export default function RoomItem({ room }) {
  return (
    <div className="room__item">
      <p className="house__title">{`Комната ${room.name}`}</p>
      <p className="house__title">{`Цена за сутки: ${room.price}`}</p>
      <button>Забронировать</button>
      <NavLink to={`https://localhost:5173/houses/${room.houseId}/rooms/${room.id}`}>Подробнее</NavLink>
    </div>
  )
}
