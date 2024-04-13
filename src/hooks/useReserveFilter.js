import { useApiData } from "../contexts/ApiProvider";

export default function useReserveFilter() {
  const { reservedDates } = useApiData();

  const reserveFilter = (item, { checkInDate, checkOutDate, guestsCount }) => {
    
    if (item.roomCount < guestsCount) return false;

    const isAvailable = !reservedDates.some(b => {
      if (b.propertyType !== item.type || b.itemId !== item.id) return false;

      const existingCheckIn = new Date(b.checkInDate);
      const existingCheckOut = new Date(b.checkOutDate);
      const newCheckIn = new Date(checkInDate);
      const newCheckOut = new Date(checkOutDate);

      return (newCheckIn < existingCheckOut && newCheckOut > existingCheckIn);
    });

    return isAvailable;
  }

  return { reserveFilter };
}
