import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookingAsync, fetchBookingAsync } from "../../../store/features/lists/booking/bookingFetch";
import BookingItem from "../items/BookingItem";
import EmptyListMessage from "../../../components/EmptyListMessage";
import ErrorMessage from "../../../components/ErrorMessage";
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
  const booking = useSelector((state) => state.booking.data);
  console.log(booking);
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
    dispatch(deleteBookingAsync(bookingId));
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

  return (
    isLoading ? (
      <LoadingSpinner />
    ) : (
      <>
        <ErrorMessage />
        <div className="aparts__list">
          <div className="houses__list-top">
            <p>Список броней</p>
            <button onClick={handleAddBooking} className="houses__list-add">
              Добавить
            </button>
          </div>
          {booking && booking.length > 0 ? (
            booking.map(bookingItem => (
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
