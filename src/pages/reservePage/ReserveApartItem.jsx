import React from 'react';
import { NavLink } from 'react-router-dom';
import { useModals } from '../../contexts/ModalsProvider';


export default function ReserveApartItem({ apart, apartPictureUrl, days, calculatePrice }) {

  const { openBookingModal } = useModals()
  
  return (
    <div key={apart.id} className="apart__item">
      <img style={{ width: 'auto' }} src={apartPictureUrl} alt="Квартира" />
      <p className="house__title">{`Квартира ${apart.name}`}</p>
      <p className="house__title">{`Адрес: ${apart.address}`}</p>
      <p className="house__title">{`Количество спальных мест: ${apart.roomCount}`}</p>
      <p className="house__title">{`Цена за сутки: ${apart.price} рублей`}</p>
      <p className="house__title">{`Общая стоимость за ${days} дней:`}<br></br>{`${calculatePrice(apart.price, days)} рублей`}</p>
      <NavLink to={`/apartments/${apart.id}`}>
        <button className='btn__details'>Подробнее</button>
      </NavLink>
      <button onClick={() => { openBookingModal(apart) }}>Забронировать</button>
    </div>
  );
}
