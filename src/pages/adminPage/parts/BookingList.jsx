import React, { useCallback, useContext, useEffect } from "react";
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

  const handleDeleteBooking = useCallback(async (bookingId) => {
    await deleteBooking(bookingId);
    // onFetchBooking();
    fetchDataBooking()
  }, [onFetchBooking]);

  const handleToggleItemsList = () => {
    setViewState(viewState === 'list' ? 'none' : 'list');
  };

  return (
    <>
      {viewState === 'list' ? (
        <ItemsList />
      ) : viewState === 'form' ? (
        <AddBookingForm />
      ) : (
        <div className="aparts__list">
          <div className="houses__list-top">
            <p>Список броней</p>
            <button onClick={handleToggleItemsList} className="houses__list-add">
              Добавить
            </button>
          </div>
          {Array.isArray(booking) && booking.length > 0 ? (
            booking.map(details => (
              <BookingItem
                handleEdit={handleEdit}
                key={details.id}
                booking={details}
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
