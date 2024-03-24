import React from 'react';
import { NavLink } from 'react-router-dom';
import { useModals } from '../../contexts/ModalsProvider';


export default function ReserveApartItem({ apart, apartPictureUrl, days, calculatePrice }) {
  // const 
  return (
    <div key={apart.id} className="apart__item">
      <img style={{ width: 'auto' }} src={apartPictureUrl} alt="Квартира" />
      <NavLink to={`/apartments/${apart.id}`}>
        <p className="house__title">{`Квартира ${apart.name}`}</p>
      </NavLink>
      <p className="house__title">{`Адрес: ${apart.address}`}</p>
      <p className="house__title">{`Количество спальных мест: ${apart.roomCount}`}</p>
      <p className="house__title">{`Цена за сутки: ${apart.price} рублей`}</p>
      <p className="house__title">{`Общая стоимость за ${days} дней:`}<br></br>{`${calculatePrice(apart.price, days)} рублей`}</p>
      <button className='btn__details'>Подробнее</button>
      <button onClick={() => {/* функция бронирования */ }}>Забронировать</button>
    </div>
  );
}
