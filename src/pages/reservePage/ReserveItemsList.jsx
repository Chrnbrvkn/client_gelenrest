import React, { useEffect, useState } from 'react'
import { useApiData } from '../../contexts/ApiProvider';

import { useData } from '../../contexts/DataProvider'


export default function ReserveItemsList({ ...props }) {
  const { isLoading } = useData()
  const { rooms, aparts, booking, houses, housesPictures, apartsPictures, roomsPictures } = useApiData();
  useEffect(() => {
    console.log('Количество дней: ', (props.checkOutDate - props.checkInDate) / (24 * 3600 * 1000));
    console.log('Гости: ', props.guestsCount);
    console.log('ROOMS: ', rooms);
    console.log('APARTS: ', aparts);
    console.log('HOUSES: ', houses);
    console.log('BOOKINGs: ', booking);
  })


  const itemFilter = (item) => {
    if (item.roomCount > props.guestsCount) return item
  }

  if (isLoading) (
    <p>Загрузка</p>
  )

  return (
    <>
      <h2 className="title">Список подходящих номеров:</h2>
      <div className="reserveItems-list">

        {rooms.filter(itemFilter).map(room => (
          <div key={room.id} className="room__item">
            <p className="house__title">
              {`Дом ${houses.find(house => house.id === room.houseId).name}
            Комната ${room.name}`}
            </p>
            <p className="house__title">{`Адрес: ${houses.find(house => house.id === room.houseId).address}`}</p>
            <p className="house__title">{`Количество спальных мест ${room.roomCount}`}</p>
            <p className="house__title">{`Цена за сутки: ${room.price}`}</p>
            <p className="house__title">
              {`Цена за ${props.days === 1 ? `${props.days} день` : `${props.days} дней: `}
            ${room.price * props.days}`}
            </p>
            <button >Забронировать</button>
          </div>
        ))}
        {aparts.filter(itemFilter).map(apart => (
          <div key={apart.id} className="room__item">
            <p className="house__title">{`Квартира ${apart.name}`}</p>
            <p className="house__title">{`Адрес: ${apart.address}`}</p>
            <p className="house__title">{`Количество спальных мест ${apart.roomCount}`}</p>
            <p className="house__title">{`Цена за сутки: ${apart.price}`}</p>
            <p className="house__title">
              {`Цена за ${props.days === 1 ? `${props.days} день` : `${props.days} дней: `}
            ${apart.price * props.days}`}
            </p>
            <button >Забронировать</button>
          </div>
        ))}
      </div>
    </>
  )
}
