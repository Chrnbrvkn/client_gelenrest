import { useApiData } from "../contexts/ApiProvider";

export default function useReserveFilter() {
  const { booking } = useApiData();

  const reserveFilter = (item, { checkInDate, checkOutDate, guestsCount }) => {
    // Проверяем, что количество гостей не превышает вместимость
    if (item.roomCount < guestsCount) return false;

    // Проверяем, что даты заезда и выезда не пересекаются с существующими бронированиями
    const isAvailable = !booking.some(b => {
      if (b.propertyType !== item.type || b.itemId !== item.id) return false;

      const existingCheckIn = new Date(b.checkInDate);
      const existingCheckOut = new Date(b.checkOutDate);
      const newCheckIn = new Date(checkInDate);
      const newCheckOut = new Date(checkOutDate);
      console.log('!!!!!!!!!!!!!!!!!!!!');
      console.log(existingCheckIn);
      console.log(existingCheckOut)
      console.log(newCheckIn);
      console.log(newCheckIn);
      // Проверяем пересечение дат
      return (newCheckIn < existingCheckOut && newCheckOut > existingCheckIn);
    });

    return isAvailable;
  }

  return { reserveFilter };
}
