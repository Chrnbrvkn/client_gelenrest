import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingAsync } from "../../../store/features/lists/booking/bookingFetch";
import { deleteBooking } from "../../../api/bookingApi";
import BookingItem from "../items/BookingItem";
import EmptyListMessage from "../../../components/EmptyListMessage";


export default function BookingList() {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking.data);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchBookingAsync());
  }, [dispatch]);

  const handleDeleteBooking = async (bookingId) => {
    await deleteBooking(bookingId);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const sortedBooking = booking?.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const filteredAndSortedBooking = sortedBooking?.filter(bookingItem => {
    switch (filter) {
      case 'confirmed':
        return bookingItem.status === 'Подтверждён';
      case 'pending':
        return bookingItem.status === 'В ожидании';
      case 'rejected':
        return bookingItem.status === 'Отклонён';
      default:
        return true;
    }
  });

  return (
    <div className="aparts__list">
      <div className="houses__list-top">
        <p>Список броней</p>
        <button className="houses__list-add">
          Добавить
        </button>
        <select name="filter" onChange={handleFilterChange}>
          <option value="all">Все</option>
          <option value="confirmed">Подтверждённые</option>
          <option value="pending">В ожидании</option>
          <option value="rejected">Отклонённые</option>
        </select>
      </div>
      {Array.isArray(filteredAndSortedBooking) && filteredAndSortedBooking.length > 0 ? (
        filteredAndSortedBooking.map(details => (
          <BookingItem
            handleEdit={handleEdit}
            key={details.id}
            details={details}
            onDelete={() => handleDeleteBooking(details.id)}
          />
        ))
      ) : (
        <EmptyListMessage />
      )}
    </div>
  );
}
