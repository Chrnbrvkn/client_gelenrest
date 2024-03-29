import { useApiData } from "../contexts/ApiProvider";

export default function useReserveFilter() {
  const { reservedDates } = useApiData();

  const reserveFilter = (item, { checkInDate, checkOutDate, guestsCount }) => {
    
    if (item.roomCount < guestsCount) return false;

    // Проверяем, что даты заезда и выезда не пересекаются с существующими бронированиями
    const isAvailable = !reservedDates.some(b => {
      if (b.propertyType !== item.type || b.itemId !== item.id) return false;

      const existingCheckIn = new Date(b.checkInDate);
      const existingCheckOut = new Date(b.checkOutDate);
      const newCheckIn = new Date(checkInDate);
      const newCheckOut = new Date(checkOutDate);

      // Проверяем пересечение дат
      return (newCheckIn < existingCheckOut && newCheckOut > existingCheckIn);
    });

    return isAvailable;
  }

  return { reserveFilter };
}
