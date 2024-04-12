

import React from 'react';

const BookingItem = ({ booking, onEdit, onDelete }) => {

const formatDate = (date) => {
  
}

  return (
    <div className="houses__list-item--content">
      <div className="houses__list-item">
        <h3>Бронь номер: {booking.id}</h3>
        <p>Дата создания: {new Date(booking.createdAt).toLocaleDateString()}</p>
        <p>Дата изменения: {new Date(booking.updatedAt).toLocaleDateString()}</p>
        <h3>Название номера: <br />
          {booking.itemType === 'apart' ?
            ` квартира ${booking.itemName}`
            : ` дом ${booking.houseName} комната ${booking.itemName}`}</h3>
        <h3>Адрес номера: {booking.address}</h3>
        <h3>Имя гостя: {booking.guestName}</h3>
        <p>Контакт: {booking.guestContact}</p>
        <p>Дата заезда: {new Date(booking.checkInDate).toLocaleDateString()}</p>
        <p>Дата выезда: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
        <p>Статус: {booking.status}</p>
        <p>Количество гостей: {booking.guestsCount}</p>
        <p>Стоимость брони: {booking.totalCost}</p>
      </div>
      <div className="home__redact-buttons">
        <button className="houses__list-update" onClick={() => onEdit(booking)}>Изменить</button>
        <button className="houses_list-delete" onClick={() => onDelete(booking.id)}>Удалить</button>
      </div>
    </div>
  );
};

export default BookingItem;
