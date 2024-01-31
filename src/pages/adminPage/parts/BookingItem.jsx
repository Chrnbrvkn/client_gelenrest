export default function BookingItem({ booking, handleEdit, onDelete }) {
  const handleClickEdit = () => handleEdit(booking.id, 'booking');

  return (
    <div key={booking.id} className="houses__list-item--content">
      <div className="houses__list-item">
        <strong>Бронь номер: {booking.id}</strong><br />
        Имя гостя: {booking.guestName}<br />
        Контакт: {booking.guestContact}<br />
        Даты: {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}<br />
        Статус: {booking.status}<br />
        {booking.itemDetails ? `Тип: ${booking.itemType} - ${booking.itemDetails.name}` : 'Тип: Не указан'}
        {booking.houseDetails ? ` (Дом: ${booking.houseDetails.name}, Адрес: ${booking.houseDetails.address})` : ''}
      </div>
      <div className="home__redact-buttons">
        <button className="houses__list-update" onClick={handleClickEdit}>Изменить</button>
        <button className="houses_list-delete" onClick={() => onDelete(booking.id)}>Удалить</button>
      </div>
    </div>
  );
}
