import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useData } from '../../contexts/DataProvider'

import { useBookingContext } from '../../contexts/BookingProvider'
export default function RoomItem({ room }) {
  const { isLoading } = useData()

  const { openBookingModal } = useBookingContext()

  const handleReserveClick = () => {
    openBookingModal(room)
  }



  if (isLoading) {
    return <div>Загрузка...</div>
  }
  return (
    <div className="room__item">
      <p className="house__title">{`Комната ${room.name}`}</p>
      <p className="house__title">{`Цена за сутки: ${room.price}`}</p>
      <button onClick={() => handleReserveClick()}>Забронировать</button>
      <NavLink to={`https://localhost:5173/houses/${room.houseId}/rooms/${room.id}`}>Подробнее</NavLink>
    </div>
  )
}
