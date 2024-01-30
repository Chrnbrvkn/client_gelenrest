import { useCallback } from "react"
import { deleteBooking } from "../../../api/bookingApi"
import AddBookingForm from "./AddBookingForm"
import BookingItem from "./BookingItem"
import EmptyListMessage from "../../../components/EmptyListMessage"
import ItemsList from "./ItemsList"
import { useAdmin } from "../../../contexts/AdminProvider"



export default function BookingList({
  booking,
  onFetchBooking
}) {
  const {
    viewState,
    setViewState,
    selectedItem,
    setSelectedItem
  } = useAdmin();

  const handleDeleteBooking = useCallback(async (bookingId) => {
    await deleteBooking(bookingId)
    onFetchBooking()
  }, [onFetchBooking])


  const handleToggleItemsList = () => {
    setViewState(viewState === 'list' ? 'none' : 'list');
  };

  return (
    <>
      {viewState === 'list' ? (
        <ItemsList />
      ) : viewState === 'form' ? (
        <AddBookingForm
          selectedItem={selectedItem}
          onBookingAdded={onFetchBooking}
        />
      ) : (
        <div className="aparts__list">
          <div className="houses__list-top">
            <p>Список броней</p>
            <button onClick={handleToggleItemsList} className="houses__list-add">
              Добавить
            </button>
          </div>
          {Array.isArray(booking) ? (
            booking.length === 0 ? (
              <EmptyListMessage />
            ) : (
              booking.map(bookingItem => (
                <BookingItem
                  key={bookingItem.id}
                  booking={bookingItem}
                  onDelete={() => handleDeleteBooking(bookingItem.id)}
                />
              ))
            )
          ) : (
            <div>Список броней пуст</div>
          )}
        </div>
      )}
    </>
  )
}
