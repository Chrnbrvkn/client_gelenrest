import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useData } from '../../contexts/DataProvider'


export default function RoomItem({ room }) {
  const { isLoading } = useData()
  const { type, itemId } = useParams()
  const [selectedItemId, setSelectedItemId] = useState(itemId)
  const [typeItem, setTypeItem] = useState(type)
  const handleReserveClick = () => {
    setTypeItem('room')
    setSelectedItemId(itemId ? itemId : room.id)
  }



  if (isLoading) {
    return <div>Загрузка...</div>
  }
  return (
    <div className="room__item" onClick={() => handleReserveClick()}>
      <p className="house__title">{`Комната ${room.name}`}</p>
      <p className="house__title">{`Цена за сутки: ${room.price}`}</p>
      <button >Забронировать</button>
      <NavLink to={`https://localhost:5173/houses/${room.houseId}/rooms/${room.id}`}>Подробнее</NavLink>
    </div>
  )
}
