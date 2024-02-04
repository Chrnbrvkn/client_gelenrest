import React from 'react'
import { useApiData } from '../../contexts/ApiProvider'
import { useData } from '../../contexts/DataProvider'
import { NavLink } from 'react-router-dom'

export default function ApartItem({ apart }) {
  const { isLoading } = useData()


  if (isLoading) {
    return <div>Загрузка...</div>
  }
  return (
    <div className="apart__item">
      <p className="house__title">{`Квартира: ${apart.name}`}</p>
      <p className="house__title">{`Адрес: ${apart.address}`}</p>
      <p className="house__title">{`Цена за сутки: ${apart.price}`}</p>
      <p className="house__title">{`До моря: ${apart.timeToSea} минут`}</p>
      <button>Забронировать</button>
      <NavLink to={`https://localhost:5173/apartments/${apart.id}`}>Подробнее</NavLink>
    </div>
  )
}
