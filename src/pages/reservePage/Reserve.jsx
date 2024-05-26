import { useEffect } from "react";
import { ReserveDate, useReserveDate } from "src/widgets/ReserveDate";
import { useDispatch, useSelector } from "react-redux";
import "./reservePage.css";
import { fetchAllRoomsAsync } from "src/store/features/lists/rooms/roomsFetch";
import { fetchApartsAsync } from "src/store/features/lists/aparts/apartsFetch";
import { fetchHousesAsync } from "src/store/features/lists/houses/housesFetch";
import ReserveItemsList from "./ReserveItemsList";

export default function Reserve() {
  const reserveProps = useReserveDate();

  const aparts = useSelector((state) => state.aparts.data);
  const houses = useSelector((state) => state.houses.data);
  const rooms = useSelector((state) => state.rooms.allRooms);

  const { checkInDate, checkOutDate, guestsCount } = useSelector(
    (state) => state.reserve
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllRoomsAsync());
    dispatch(fetchApartsAsync());
    dispatch(fetchHousesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      if (guestsCount && endDate - startDate >= 3 * (24 * 3600 * 1000)) {
        reserveProps.setIsFindRooms(true);
      } else {
        reserveProps.setIsFindRooms(false);
      }
    }
  }, [checkOutDate, guestsCount]);

  return (
    <>
      <ReserveDate
        {...reserveProps}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guestsCount={guestsCount}
      />
      {checkInDate && checkOutDate && guestsCount && (
        <ReserveItemsList
          rooms={rooms}
          aparts={aparts}
          houses={houses}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guestsCount={guestsCount}
          days={reserveProps.selectedDays}
          isFindRooms={reserveProps.isFindRooms}
        />
      )}
    </>
  );
}
