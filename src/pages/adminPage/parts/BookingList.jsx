import React, { useCallback, useContext, useEffect } from "react";
import { deleteBooking } from "../../../api/bookingApi"
import AddBookingForm from "./AddBookingForm"
import BookingItem from "./BookingItem"
import EmptyListMessage from "../../../components/EmptyListMessage"
import ItemsList from "./ItemsList"
import { useAdmin } from "../../../contexts/AdminProvider"
import { useApiData } from "../../../contexts/ApiProvider";


export default function BookingList({
  handleEdit,
  booking,
  onFetchBooking
}) {
  const { rooms, aparts, houses } = useApiData();
  const {
    viewState,
    setViewState,
  } = useAdmin();


  const bookingDetails = booking.map(bookingItem => { 
    const itemType = bookingItem.itemType;
    const itemId = bookingItem.itemId;
    let itemDetails, houseDetails;
  
    if (itemType === 'room') {
      itemDetails = rooms.find(room => room.id === itemId);
      // Добавлена проверка на наличие itemDetails перед попыткой доступа к houseId
      if (itemDetails) {
        houseDetails = houses.find(house => house.id === itemDetails.houseId);
      }
    } else if (itemType === 'apart') {
      itemDetails = aparts.find(apart => apart.id === itemId);
    }
  
    // Если itemDetails не определен (например, не найден элемент в rooms или aparts), 
    // возвращается null или другое значение, чтобы отразить отсутствие данных.
    if (!itemDetails) {
      return null; // или можно вернуть объект с некоторыми значениями по умолчанию
    }
  
    return { ...bookingItem, itemDetails, houseDetails };
  }).filter(item => item !== null); // Исключить null значения из результата
  


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
              bookingDetails.map(details => (
                <BookingItem
                  handleEdit={handleEdit}
                  key={details.id}
                  booking={details}
                  onDelete={() => handleDeleteBooking(details.id)}
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
