import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookingAsync, fetchBookingAsync } from "../../../store/features/lists/booking/bookingFetch";
import BookingItem from "../items/BookingItem";
import EmptyListMessage from "../../../components/EmptyListMessage";
// import ErrorMessage from "../../../components/ErrorMessage";
import LoadingSpinner from '../../../components/LoadingSpinner';
import { showForm, hideForm } from '../../../store/features/pages/adminSlice';
import AddBookingForm from '../add/AddBookingForm';
import ItemsList from "./ItemsList";

import EditBooking from '../edit/EditBooking';
import { fetchAllRoomsAsync } from "../../../store/features/lists/rooms/roomsFetch";

export default function BookingList() {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { formState } = useSelector((state) => state.adminPage);
  const isLoading = useSelector((state) => state.loading.isLoading);



  useEffect(() => {
    dispatch(fetchBookingAsync());
    dispatch(fetchAllRoomsAsync());
  }, [dispatch]);

  const handleAddBooking = () => {
    setSelectedItem(null);
    dispatch(showForm({ type: 'select' }));
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    dispatch(showForm({ type: 'edit' }));
  };

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
    dispatch(showForm({ type: 'add' }));
  }

  const handleDeleteBooking = (bookingId) => {
    try {
      dispatch(deleteBookingAsync(bookingId));
      dispatch(setNotification({
        message: `Бронирование номер: ${bookingId} удалено.`,
        type: 'success',
      }));
    } catch (e) {
      dispatch(setNotification({
        message: `Ошибка при удалении брони номер: ${bookingId}. 
        ${e.message}`,
        type: 'error',
      }))
      console.log(e);
    }
  }


  if (formState.isOpen && formState.type === 'select') {
    return (
      <ItemsList
        onSelectItem={handleSelectedItem}
      />
    )
  }

  if (formState.isOpen && formState.type === 'add' && selectedItem) {
    return (
      <AddBookingForm
        selectedItem={selectedItem}
        onCancel={() => dispatch(hideForm())}
      />
    )
  }

  if (formState.isOpen && formState.type === 'edit' && selectedBooking) {
    return (
      <EditBooking
        selectedBooking={selectedBooking}
        onCancel={() => dispatch(hideForm())}
      />
    )
  }

  const [filter, setFilter] = useState('all');
  const [filterCreatedDate, setFilterCreatedDate] = useState('descending');
  const booking = useSelector((state) => state.booking.data);
  console.log(booking);

  // сортировка по последним созданным
  const sortedByFirstCreatedDate = () => [...booking].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // сортировка по последним созданным
  const sortedByLastCreatedDate = () => [...booking].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  // сортировка по первым изменённым
  const sortedByFirstUpdated = () => [...booking].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  // сортировка по последним изменённым
  const sortedByLastUpdated = () => [...booking].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));




  const handleDateFilterChange = (e) => {
    setFilterCreatedDate(e.target.value);
  }
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const sortedBooking = () => {
    if (filterCreatedDate === 'descending') {
      return sortedByFirstCreatedDate();
    }
    if (filterCreatedDate === 'ascending') {
      return sortedByLastCreatedDate();
    }
    if (filterCreatedDate === 'firstChanged') {
      return sortedByFirstUpdated();
    }
    if (filterCreatedDate === 'lastChanged') {
      return sortedByLastUpdated();
    }
  }

  const filteredAndSortedBooking = sortedBooking().filter(bookingItem => {
    switch (filter) {
      case 'confirmed':
        return bookingItem.status === 'Подтверждён';
      case 'pending':
        return bookingItem.status === 'В ожидании';
      case 'rejected':
        return bookingItem.status === 'Отменён';
      default:
        return true;
    }
  });

  return (
    isLoading ? (
      <LoadingSpinner />
    ) : (
      <>
        <div className="aparts__list">
          <div className="houses__list-top">
            <p>Список броней</p>
            <button onClick={handleAddBooking} className="houses__list-add">
              Добавить
            </button>
          </div>
          <select name="filter" onChange={handleFilterChange}>
            <option defaultChecked value="all">Все</option>
            <option value="pending">В ожидании</option>
            <option value="confirmed">Подтверждённые</option>
            <option value="rejected">Отменённые</option>

          </select>
          <select name="filterByDate" onChange={handleDateFilterChange}>
            <option defaultChecked value="descending">Новые брони</option>
            <option value="ascending">Старые брони</option>
            <option value="lastChanged">Последние изменения броней</option>
            <option value="firstChanged">Первые изменения броней</option>
          </select>
          {booking && booking.length > 0 ? (
            filteredAndSortedBooking.map(bookingItem => (
              <BookingItem
                key={bookingItem.id}
                booking={bookingItem}
                onEdit={handleEditBooking}
                onDelete={handleDeleteBooking}
              />
            ))
          ) : (
            <EmptyListMessage />
          )}
        </div>
      </>
    )
  );
}
