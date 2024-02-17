import React, { useEffect, useState } from 'react'
import { useApiData } from '../../contexts/ApiProvider';

import { useData } from '../../contexts/DataProvider'
import useReserveFilter from '../../hooks/useReserveFilter';
import { NavLink } from 'react-router-dom';

export default function ReserveItemsList({ ...props }) {
  const { isLoading } = useData()
  const { rooms, aparts, booking, houses, housesPictures, apartsPictures, roomsPictures } = useApiData();
  const { reserveFilter } = useReserveFilter()

  const [currentHouse, setCurrentHouse] = useState(null)

  const findHouse = (room) => {
    return houses.find(house => house.id === room.houseId)
  }

  useEffect(() => {
    console.log('Количество дней: ', (props.checkOutDate - props.checkInDate) / (24 * 3600 * 1000));
    console.log('День: ', props.checkOutDate);
    console.log('apartsPictures: ', apartsPictures);
    console.log('roomsPictures: ', roomsPictures);
    console.log('HOUSES: ', houses);
    console.log('BOOKINGs: ', booking);
  })

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return `${day} ${months[monthIndex]} ${year}`;
  };

  const availableRooms = rooms.filter(room => reserveFilter(room, props));
  const availableAparts = aparts.filter(apart => reserveFilter(apart, props));
  console.log(availableRooms);
  console.log(availableAparts);
  if (isLoading) (
    <p>Загрузка</p>
  )

  return (
    <>
      <h2 className="title">Список подходящих номеров:</h2>
      <div className="reserveItems-list">

        {availableRooms.map(room => (
          <div key={room.id} className="room__item">
            <img style={{ width: '200px' }}
              src={`https://api.gelenrest.ru${roomsPictures.find(p => p.roomId === room.id).url}`} alt="комната" />
            <p className="house__title">
              {`${findHouse(room).name}.
            Комната ${room.name}`}
            </p>
            <p className="house__title">{`Адрес: ${findHouse(room).address}`}</p>
            <p className="house__title">{`Количество спальных мест ${room.roomCount}`}</p>
            <p className="house__title">{`До моря ${
              findHouse(room).timeToSea < 5 
              || findHouse(room).timeToSea && findHouse(room).timeToSea % 10 < 5 ? 
              `${findHouse(room).timeToSea} минуты` : `${findHouse(room).timeToSea} минут`}`}</p>
            {/* <p className="house__title">{`Дата заезда: ${formatDate(props.checkInDate)} `}</p> */}
            <p className="house__title">{`Цена за сутки: ${room.price} рублей.`}</p>
            <p className="house__title">
              {`Цена за ${props.days < 5 || props.days > 20 && props.days % 10 < 5 ? `${props.days} дня` : `${props.days} дней: `}
            ${props.days < 10 ? Math.round(room.price * props.days) :
                  props.days < 20 ? Math.round(room.price * props.days * 0.95) :
                    Math.round(room.price * props.days * 0.8)} рублей.`}
            </p>
            <NavLink to={`/houses/${houses.find(house => house.id === room.houseId).id}`}>Посмотреть дом</NavLink>
            <NavLink to={`/houses/${houses.find(house => house.id === room.houseId).id}/rooms/${room.id}`}>Посмотреть комнату</NavLink>
            <button >Забронировать</button>
          </div>
        ))}
        {availableAparts.map(apart => (
          <div key={apart.id} className="room__item">
            <img style={{ width: '200px' }}
              src={`https://api.gelenrest.ru${apartsPictures.find(p => p.apartId === apart.id).url}`} alt="квартира" />
            <p className="house__title">{`Квартира ${apart.name}`}</p>
            <p className="house__title">{`Адрес: ${apart.address}`}</p>
            <p className="house__title">{`Количество спальных мест ${apart.roomCount}`}</p>
            <p className="house__title">{`Количество спальных мест ${apart.timeToSea}`}</p>
            {/* <p className="house__title">{`Дата заезда: ${formatDate(props.checkInDate)} `}</p> */}
            <p className="house__title">{`Цена за сутки: ${apart.price}`}</p>
            <p className="house__title">
              {`Цена за ${props.days < 5 || props.days > 20 && props.days % 10 < 5 ? `${props.days} дня` : `${props.days} дней: `}
            ${props.days < 10 ? Math.round(apart.price * props.days) :
                  props.days < 20 ? Math.round(apart.price * props.days * 0.95) :
                    Math.round(apart.price * props.days * 0.8)} рублей.`}
            </p>
            <NavLink to={`/apartments/${apart.id}`} >Посмотреть квартиру</NavLink>
            <button >Забронировать</button>
          </div>
        ))}
      </div>
    </>
  )
}
