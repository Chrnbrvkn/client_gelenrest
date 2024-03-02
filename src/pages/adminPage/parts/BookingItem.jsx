// Предположим, что этот компонент находится в файле BookingItem.js
import React from 'react';

const BookingItem = ({ details, handleEdit, onDelete }) => {

  const { id, guestName, guestContact, checkInDate, checkOutDate, status, guestsCount, totalCost } = details;
  const handleClickEdit = () => handleEdit(details.id, 'booking');
console.log(details);
  return (
    <div className="houses__list-item--content">
      <div className="houses__list-item">
        <h3>Бронь номер: {details.id}</h3>
        <h3>Название номера: {details.itemName}</h3>
        <h3>Адрес номера: {details.address}</h3>
        <h3>Имя гостя: {guestName}</h3>
        <p>Контакт: {guestContact}</p>
        <p>Дата заезда: {new Date(checkInDate).toLocaleDateString()}</p>
        <p>Дата выезда: {new Date(checkOutDate).toLocaleDateString()}</p>
        <p>Статус: {status}</p>
        <p>Количество гостей: {guestsCount}</p>
        <p>Стоимость брони: {totalCost}</p>
      </div>
      <div className="home__redact-buttons">
        <button className="houses__list-update" onClick={handleClickEdit}>Изменить</button>
        <button className="houses_list-delete" onClick={onDelete}>Удалить</button>
      </div>
    </div>
  );
};

export default BookingItem;


// export default function BookingItem({ booking, handleEdit, onDelete }) {
//   const handleClickEdit = () => handleEdit(booking.id, 'booking');

//   return (
//     <div key={booking.id} className="houses__list-item--content">
//       <div className="houses__list-item">
//         <strong>Бронь номер: {booking.id}</strong><br />
//         Имя гостя: {booking.guestName}<br />
//         Контакт: {booking.guestContact}<br />
//         Даты: {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}<br />
//         Статус: {booking.status}<br />
//         {booking.itemDetails ? `Тип: ${booking.itemType} - ${booking.itemDetails.name}` : 'Тип: Не указан'}
//         {booking.houseDetails ? ` (Дом: ${booking.houseDetails.name}, Адрес: ${booking.houseDetails.address})` : ''}
//       </div>
//       <div className="home__redact-buttons">
//         <button className="houses__list-update" onClick={handleClickEdit}>Изменить</button>
//         <button className="houses_list-delete" onClick={() => onDelete(booking.id)}>Удалить</button>
//       </div>
//     </div>
//   );
// }
