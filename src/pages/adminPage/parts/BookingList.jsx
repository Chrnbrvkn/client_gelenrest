import React, { useCallback, useContext, useEffect, useState } from "react";
import { deleteBooking } from "../../../api/bookingApi";
import AddBookingForm from "./AddBookingForm";
import BookingItem from "./BookingItem";
import EmptyListMessage from "../../../components/EmptyListMessage";
import ItemsList from "./ItemsList";
import { useAdmin } from "../../../contexts/AdminProvider";
import { useApiData } from "../../../contexts/ApiProvider";



export default function BookingList({ handleEdit, onFetchBooking }) {
  const { booking, fetchDataBooking } = useApiData();
  const { viewState, setViewState } = useAdmin();
  const [filter, setFilter] = useState('all');

  const handleDeleteBooking = useCallback(async (bookingId) => {
    await deleteBooking(bookingId);
    onFetchBooking();
    fetchDataBooking()
  }, [onFetchBooking]);

  const handleToggleItemsList = () => {
    setViewState(viewState === 'list' ? 'none' : 'list');
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const sortedBooking = booking.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const filteredAndSortedBooking = sortedBooking.filter(bookingItem => {
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
    <>
      {viewState === 'list' ? (
        <ItemsList />
      ) : viewState === 'form' ? (
        <AddBookingForm onFetchBooking={onFetchBooking} />
      ) : (
        <div className="aparts__list">
          <div className="houses__list-top">
            <p>Список броней</p>
            <button onClick={handleToggleItemsList} className="houses__list-add">
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
      )}
    </>
  );
}
