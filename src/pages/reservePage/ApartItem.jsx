import React, { useState } from 'react'
import { useApiData } from '../../contexts/ApiProvider'
import { useData } from '../../contexts/DataProvider'
import { NavLink, useParams } from 'react-router-dom'

export default function ApartItem({ apart }) {
  const { isLoading } = useData()
  const { type, itemId } = useParams()
  const [selectedItemId, setSelectedItemId] = useState(itemId)
  const [typeItem, setTypeItem] = useState(type)

  const handleReserveClick = () => {
    setTypeItem('apart')
    setSelectedItemId(itemId ? itemId : apart.id)
  }


  
  
  if (isLoading) {
    return <div>Загрузка...</div>
  }
  return (
    <div  onClick={() => handleReserveClick()} className="apart__item">
      <p className="house__title">{`Квартира: ${apart.name}`}</p>
      <p className="house__title">{`Адрес: ${apart.address}`}</p>
      <p className="house__title">{`Цена за сутки: ${apart.price}`}</p>
      <p className="house__title">{`До моря: ${apart.timeToSea} минут`}</p>
      <button>Забронировать</button>
      <NavLink to={`https://localhost:5173/apartments/${apart.id}`}>Подробнее</NavLink>
    </div>
  )
}
