import { useState, useEffect, useMemo, useCallback, useRef } from "react";

import "../../../pages/reservePage/reservePage.css";

import ReserveItemsList from "../../../pages/reservePage/ReserveItemsList";
// import { useModals } from "../../contexts/ModalsProvider";


import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRoomsAsync } from '../../../store/features/lists/rooms/roomsFetch';
import { fetchApartsAsync } from '../../../store/features/lists/aparts/apartsFetch';
import { fetchHousesAsync } from "../../../store/features/lists/houses/housesFetch";
import Calendar from "../../../components/Calendar";
import ReserveBar from "./ReserveBar";
import { useReserveDates } from '../lib/useReserveDates';


export function ReserveDate() {

  const { checkInDate, checkOutDate, guestsCount } = useSelector(state => state.reserve);

  const {
    selectedDays,
    showCalendar,
    setShowCalendar,
    isFindRooms,
    setIsFindRooms,
    isMinimumDays,
    handleOpenCalendarForCheckIn,
    handleOpenCalendarForCheckOut,
    handleFilterSelected,
    handleGuestsCountChange,
    handleResetInDate,
    handleResetOutDate,
    handleKeyDown
  } = useReserveDates();

  console.log(showCalendar);
  const aparts = useSelector((state) => state.aparts.data)
  const houses = useSelector(state => state.houses.data);
  const rooms = useSelector((state) => state.rooms.allRooms)

  const dispatch = useDispatch()
  useEffect(_ => {

    dispatch(fetchAllRoomsAsync())
    dispatch(fetchApartsAsync())
    dispatch(fetchHousesAsync())

  }, [dispatch])


  useEffect(() => {
    if(checkInDate && checkOutDate) {

      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      
      if (
        guestsCount &&
        endDate - startDate >= 3 * (24 * 3600 * 1000)
      ) {
        setIsFindRooms(true);
      } else {
        setIsFindRooms(false);
      }
    }
  }, [checkOutDate, guestsCount]);



  return (
    <>
      <div className="reserve__page">
        <div className="container">
          <h2>Забронировать место для отдыха</h2>
          <div className="reserve__items">
            <p className="text">10-19 суток скидка 5% Бонусы по телефону 20-30 скидка 10% Бонусы при
              телефону Помесячно только по телефону</p>
          </div>
          <ReserveBar
            handleOpenCalendarForCheckIn={handleOpenCalendarForCheckIn}
            handleOpenCalendarForCheckOut={handleOpenCalendarForCheckOut}
            handleFilterSelected={handleFilterSelected}
            handleGuestsCountChange={handleGuestsCountChange}
            handleResetInDate={handleResetInDate}
            handleResetOutDate={handleResetOutDate}
            handleKeyDown={handleKeyDown}
          />
          {checkInDate &&
            checkOutDate - checkInDate <= 3 * (24 * 3600 * 1000) && (
              <div className="reserve__min-day">
                <p style={{ textAlign: "center" }}>от трёх дней</p>
              </div>
            )}
          {showCalendar && (
            <Calendar
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onClose={() => setShowCalendar(false)}
            />
          )}
          {isFindRooms && (
            <ReserveItemsList
              rooms={rooms}
              aparts={aparts}
              houses={houses}
              days={selectedDays}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              guestsCount={guestsCount}
              isFindRooms={isFindRooms}
            />
          )}
        </div>
      </div>
    </>
  );
}
