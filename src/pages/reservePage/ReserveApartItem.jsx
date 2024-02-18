import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ReserveApartItem({ apart, apartPictureUrl, days, calculatePrice }) {
  return (
    <div key={apart.id} className="apart__item">
      <img style={{ width: '200px' }} src={apartPictureUrl} alt="Квартира" />
      <NavLink to={`/apartments/${apart.id}`}>
        <p className="house__title">{`Квартира ${apart.name}`}</p>
      </NavLink>
      <p className="house__title">{`Адрес: ${apart.address}`}</p>
      <p className="house__title">{`Количество спальных мест: ${apart.roomCount}`}</p>
      <p className="house__title">{`Цена за сутки: ${apart.price} рублей`}</p>
      <p className="house__title">{`Общая стоимость за ${days} дней: ${calculatePrice(apart.price, days)} рублей`}</p>

      <button onClick={() => {/* функция бронирования */ }}>Забронировать</button>
    </div>
  );
}
