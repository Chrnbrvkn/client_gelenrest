import React, { useEffect, useState } from "react";
import useCalendar from "../hooks/useCalendar";
import { useDispatch, useSelector } from "react-redux";

import "../assets/styles/componentsStyles/calendar.css";

import { fetchClientBooking } from "../store/features/lists/clientBooking/clientBookingFetch";
import {
  setCheckInDate,
  setCheckOutDate,
} from "src/store/features/reserve/reserveSlice";

import { useReserveFilter } from "../hooks/useReserveFilter";

export default function Calendar({
  checkInDate,
  checkOutDate,
  guestsCount,
  onClose,
  selectedItem,
  selectedBooking,
  isAdmin = false,
}) {
  const {
    currentYear,
    currentMonth,
    incrementMonth,
    decrementMonth,
    monthsOfYear,
    firstMonthDays,
    secondMonthDays,
    isPastDay,
    isStartDate,
  } = useCalendar();

  const { reserveFilter } = useReserveFilter();

  const [hoveredDate, setHoveredDate] = useState(null);

  const dispatch = useDispatch();
  const booking = useSelector((state) => state.clientBooking.data);

  useEffect(() => {
    console.log(booking);
    console.log(selectedItem);
    console.log("CHECK IN: ", checkInDate);
    console.log("CHECK OUT: ", checkOutDate);
    dispatch(fetchClientBooking());
  }, []);

  const handleDayClick = (e, day, isNextMonth) => {
    e.preventDefault();
    let date = new Date(
      Date.UTC(currentYear, isNextMonth ? currentMonth + 1 : currentMonth, day)
    );

    const startDate = new Date(checkInDate);

    if (!checkInDate && !checkOutDate) {
      dispatch(setCheckInDate(date.toISOString()));
    } else if (checkInDate && !checkOutDate && date < startDate) {
      dispatch(setCheckInDate(date.toISOString()));
    } else if (checkInDate && !checkOutDate) {
      if (
        date > startDate &&
        (isAdmin || (date - startDate) / (1000 * 60 * 60 * 24) >= 3) &&
        (isAdmin || !selectedItem ||
          reserveFilter(selectedItem, {
            checkInDate: startDate,
            checkOutDate: date,
            guestsCount: guestsCount,
            itemType: selectedItem.houseId ? "room" : "apart",
          }))
      ) {
        dispatch(setCheckOutDate(date.toISOString()));
        onClose();
      }
    }
  };

  const isDateInRange = (day, index) => {
    if (day === "A") return false;

    const monthOffset = index >= 42 ? 1 : 0;
    const date = new Date(currentYear, currentMonth + monthOffset, day);

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const hoveredDateAsDate = new Date(hoveredDate);

    // Проверяем, находится ли дата в диапазоне между checkInDate и hoveredDate
    if (startDate && hoveredDateAsDate) {
      return date >= startDate && date <= hoveredDateAsDate;
    }

    // Проверяем, находится ли дата в диапазоне между checkInDate и checkOutDate
    if (startDate && endDate) {
      return date >= startDate && date <= endDate;
    }
    return false;
  };

  const handleDayMouseEnter = (day, isNextMonth) => {
    if (!checkInDate || day === "A") return;

    const startDate = new Date(checkInDate);
    const newHoveredDate = new Date(
      currentYear,
      isNextMonth ? currentMonth + 1 : currentMonth,
      day
    );

    if (newHoveredDate >= startDate) {
      setHoveredDate(newHoveredDate.toISOString());
    }
  };

  const isDayBooked = (day, monthOffset) => {
    if (!selectedItem) {
      return false;
    }

    const dateToCheck = new Date(
      Date.UTC(currentYear, currentMonth + monthOffset, day)
    );
    dateToCheck.setUTCHours(9, 2, 0, 0);

    return booking.some(b => {
      // Проверка соответствия объекта бронирования выбранному элементу
      if (selectedBooking && b.id === selectedBooking.id) {
        return false;
      }

      if (
        (selectedItem.houseId &&
          b.houseId === selectedItem.houseId &&
          b.roomId === selectedItem.id) ||
        (!selectedItem.houseId && b.apartId === selectedItem.id)
      ) {
        const startDate = new Date(b.checkInDate);
        const endDate = new Date(b.checkOutDate);

        return dateToCheck >= startDate && dateToCheck <= endDate;
      }
      return false;
    });
  };

  return (
    <div className="reserve__interface reserve__interface--modal">
      <div className="container">
        {!isAdmin && (
          <div className="calendar__title">
            <h2>Выберите дату поездки ниже:</h2>
            {/* <h2>Выберите дату поездки из предложенных свободных дат:</h2> */}
            <p className="reserve__interface--minday">
              (от 3х дней)
              <p className="text">скидки на проживание от 7 суток</p>
            </p>
          </div>
        )}
        <div className="calendar">
          <p className="current__select">Дата заезда:</p>
          <div className="calendar__table">
            <div className="calendar__days">
              <div className="current_month">
                <div className="top">
                  <button className="left" onClick={decrementMonth}>
                    &lt;
                  </button>
                  <span>{`${monthsOfYear[currentMonth]} ${currentYear}`}</span>
                </div>
                <div className="first__daysList">
                  <div className="monday">ПН</div>
                  <div className="tuesday">ВТ</div>
                  <div className="wednesday">СР</div>
                  <div className="thursday">ЧТ</div>
                  <div className="friday">ПТ</div>
                  <div className="saturday">СБ</div>
                  <div className="sunday">ВС</div>
                  {firstMonthDays.map((day, index) => (
                    <button
                      key={index}
                      onMouseEnter={() => handleDayMouseEnter(day)}
                      onMouseLeave={() => setHoveredDate(null)}
                      className={`day-item ${day === "A" ? "empty" : ""}
                    ${isPastDay(day, 0) ? "disabled" : ""}
                    ${isDayBooked(day, 0) ? "booked" : ""}

                    ${isStartDate(checkInDate, day, 0) ? "start-date" : ""}
                    
                    ${isDateInRange(day, index) ? "in-range" : ""}`}

                      onClick={(e) =>
                        day !== "A" &&
                        !isPastDay(day, 0) &&
                        handleDayClick(e, day, false)
                      }

                      disabled={isAdmin 
                        ? false 
                        : isPastDay(day, 0) || isDayBooked(day, 0)}

                    >
                      {day !== "A" ? day : ""}
                    </button>
                  ))}
                </div>
              </div>
              <div className="next_month">
                <div className="top">
                  <span>
                    {`${monthsOfYear[(currentMonth + 1) % 12]} ${
                      currentMonth === 11 ? currentYear + 1 : currentYear
                    }`}
                  </span>
                  <button className="right" onClick={incrementMonth}>
                    &gt;
                  </button>
                </div>
                <div className="first__daysList">
                  <div className="monday">ПН</div>
                  <div className="tuesday">ВТ</div>
                  <div className="wednesday">СР</div>
                  <div className="thursday">ЧТ</div>
                  <div className="friday">ПТ</div>
                  <div className="saturday">СБ</div>
                  <div className="sunday">ВС</div>
                  {secondMonthDays.map((day, index) => (
                    <button
                      key={index + 42}
                      onMouseEnter={() => handleDayMouseEnter(day, true)}
                      onMouseLeave={() => setHoveredDate(null)}
                      className={`day-item ${day === "A" ? "empty" : ""}
                    ${isPastDay(day, 1) ? "disabled" : ""} 
                    ${isDayBooked(day, 1) ? "booked" : ""}
                    
                    ${isStartDate(checkInDate, day, 1) ? "start-date" : ""}

                    ${isDateInRange(day, index + 42) ? "in-range" : ""}`}

                      onClick={(e) =>
                        !isPastDay(day, 1) && handleDayClick(e, day, true)
                      }

                      disabled={isAdmin 
                        ? false 
                        : isPastDay(day, 1) || isDayBooked(day, 1)}

                    >
                      {day !== "A" ? day : ""}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
