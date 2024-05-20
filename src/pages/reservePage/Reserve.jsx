import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useData } from "../../contexts/DataProvider";
import useScrollTop from "../../hooks/useScrollTop";
import "./reservePage.css";

import ChooseReserveTime from "./ChooseReserveTime";
import ReserveItemsList from "./ReserveItemsList";
import { useModals } from "../../contexts/ModalsProvider";


import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRoomsAsync } from '../../store/features/lists/rooms/roomsFetch';
import { fetchApartsAsync } from '../../store/features/lists/aparts/apartsFetch';
import { fetchHousesAsync } from "../../store/features/lists/houses/housesFetch";
import Calendar from "../../components/Calendar";



export default function Reserve() {
  useScrollTop();
  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guestsCount,
    setGuestsCount,
  } = useModals();


  const [selectedDays, setSelectedDays] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isFindRooms, setIsFindRooms] = useState(false);
  const [isMinimumDays, setIsMinimumDays] = useState(false);


  const aparts = useSelector((state) => state.aparts.data)
  const houses = useSelector(state => state.houses.data);
  const rooms = useSelector((state) => state.rooms.allRooms)

  const dispatch = useDispatch()
  useEffect(_ => {

    dispatch(fetchAllRoomsAsync())
    dispatch(fetchApartsAsync())
    dispatch(fetchHousesAsync())

  }, [dispatch])

  

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const guestsInputRef = useRef(null);

  const handleOpenCalendarForCheckIn = useCallback(() => {
    setShowCalendar(true);
    setCheckInDate(null);
  }, []);

  const handleOpenCalendarForCheckOut = useCallback(() => {
    if (!checkInDate) {
      handleOpenCalendarForCheckIn();
    } else {
      setShowCalendar(true);
      setCheckOutDate(null);
    }
  }, [checkInDate, handleOpenCalendarForCheckIn]);

  const handleResetDate = () => {
    setCheckInDate(null);
    setCheckOutDate(null); // Скрыть подсказки
  };

  const handleFilterSelected = () => {
    if (
      checkInDate &&
      checkOutDate &&
      guestsCount &&
      checkOutDate - checkInDate < 3 * (24 * 3600 * 1000)
    ) {
      setIsMinimumDays(true);
      setIsFindRooms(false);
    }

    if (
      checkInDate &&
      checkOutDate &&
      guestsCount &&
      checkOutDate - checkInDate >= 3 * (24 * 3600 * 1000)
    ) {
      setSelectedDays((checkOutDate - checkInDate) / (24 * 3600 * 1000));
      setIsFindRooms(true);
      setIsMinimumDays(false);
    }
  };


  useEffect(() => {
    if (checkOutDate) {
      guestsInputRef.current.focus();
    }
    if (
      checkInDate &&
      checkOutDate &&
      guestsCount &&
      checkOutDate - checkInDate >= 3 * (24 * 3600 * 1000)
    ) {
      setIsFindRooms(true);
    } else {
      setIsFindRooms(false);
    }
  }, [checkOutDate, guestsCount]);

  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e") {
      e.preventDefault();
    }
  };
  const handleGuestsCountChange = (e) => {
    const value = e.target.value;
    setGuestsCount(value.replace(/\D/g, ""));
  };

  return (
    <>
      <div className="reserve__page">
        <div className="container">
          <h2>Забронировать место для отдыха</h2>
          <div className="reserve__items">
            <p className="text">10-19 суток скидка 5% Бонусы по телефону 20-30 скидка 10% Бонусы при
              телефону Помесячно только по телефону</p>
          </div>
          <div className="reserve__items">
            <div>
              <div
                className="selected__date"
                onClick={handleOpenCalendarForCheckIn}
              >
                {checkInDate ? checkInDate.toLocaleDateString() : "Заезд"}
                {checkInDate && (
                  <button
                    onClick={handleResetDate}
                    className="date-reset-button"
                  >
                    Х
                  </button>
                )}
              </div>
            </div>
            <div>
              <div
                className="selected__date"
                onClick={handleOpenCalendarForCheckOut}
              >
                {checkOutDate ? checkOutDate.toLocaleDateString() : "Выезд"}
                {checkOutDate && (
                  <button
                    onClick={handleResetDate}
                    className="date-reset-button"
                  >
                    Х
                  </button>
                )}
              </div>
            </div>
            <div className="guests__count">
              Гости:
              <input
                ref={guestsInputRef}
                type="number"
                value={guestsCount || ""}
                onChange={handleGuestsCountChange}
                placeholder=""
                onKeyDown={handleKeyDown}
                min="1"
                max="200"
              />
            </div>
            <div className="findNumbers">
              <button onClick={handleFilterSelected}>Найти номера</button>
            </div>
          </div>
          {checkInDate &&
            checkOutDate - checkInDate < 3 * (24 * 3600 * 1000) && (
              <div className="reserve__min-day">
                <p style={{ textAlign: "center" }}>от трёх дней</p>
              </div>
            )}
          {showCalendar && (
            <Calendar
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              onClose={closeCalendar}
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
