import { useEffect } from "react";
import { fetchClientBooking } from "../store/features/lists/clientBooking/clientBookingFetch";
import { useDispatch, useSelector } from 'react-redux';


export function useReserveFilter() {
  const dispatch = useDispatch();
  const reservedDates = useSelector(state => state.clientBooking.data);

  useEffect(() => {
    dispatch(fetchClientBooking());
    console.log(reservedDates);
  }, [dispatch]);

  const reserveFilter = (item, { checkInDate, checkOutDate, guestsCount, itemType }) => {
    console.log('RESERVE_FILTER:');
    console.log(item);

    // Проверка соответствия количества гостей местам
    if (item.bedCount < guestsCount) return false;

    const isAvailable = !reservedDates.some(booking => {
      // Проверяем совпадение по типу и идентификатору
      if (itemType === 'room' && (booking.roomId !== item.id || booking.houseId !== item.houseId)) return false;
      if (itemType === 'apart' && (booking.apartId !== item.id)) return false;

      const existingCheckIn = new Date(booking.checkInDate);
      const existingCheckOut = new Date(booking.checkOutDate);
      const newCheckIn = new Date(checkInDate);
      const newCheckOut = new Date(checkOutDate);

      return (newCheckIn < existingCheckOut && newCheckOut >= existingCheckIn);
    });

    return isAvailable;
  };

  return { reserveFilter };
}
