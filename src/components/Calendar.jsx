import React, { useEffect, useState } from "react";
import useCalendar from "../hooks/useCalendar";
import { useDispatch, useSelector } from "react-redux";

import "../assets/styles/componentsStyles/calendar.css";

import { fetchClientBooking } from "../store/features/lists/clientBooking/clientBookingFetch";


export default function Calendar({
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  onClose,
  selectedItem,
  selectedBooking
}) {

  const {
    currentYear,
    currentMonth,
    incrementMonth,
    decrementMonth,
    monthsOfYear,
    firstMonthDays,
    secondMonthDays,
    isPastDay
  } = useCalendar();

  const [hoveredDate, setHoveredDate] = useState(null);

  const dispatch = useDispatch();
  const booking = useSelector((state) => state.clientBooking.data);


  console.log(booking)
  console.log(selectedItem)
  console.log('CHECK IN: ', checkInDate)
  console.log('CHECK OUT: ', checkOutDate)

  useEffect(() => {
    dispatch(fetchClientBooking());
  }, []);


  // Проверка свободен ли диапазон выбранных дат
  const isIntervalFree = (checkIn, checkOut) => {
    if (!selectedItem) return false;

    const startDate = new Date(checkIn).toISOString();
    const endDate = new Date(checkOut).toISOString();

    return !booking.some(b => {
      if ((selectedItem.houseId && b.houseId === selectedItem.houseId && b.roomId === selectedItem.id) ||
        (!selectedItem.houseId && b.apartId === selectedItem.id)) {
        const existingStart = new Date(b.checkInDate).toISOString();
        const existingEnd = new Date(b.checkOutDate).toISOString();
        return (existingStart <= endDate && existingEnd >= startDate);
      }
      return false;
    });
  };



  const handleDayClick = (e, day, isNextMonth) => {
    // Выбор даты заезда и выезда
    e.preventDefault();
    let date;

    if (!checkInDate && !checkOutDate) {

      date = new Date(Date.UTC(
        currentYear,
        isNextMonth ? currentMonth + 1 : currentMonth,
        day, 9, 1
      ));
    }
    if (checkInDate && !checkOutDate) {

      date = new Date(Date.UTC(
        currentYear,
        isNextMonth ? currentMonth + 1 : currentMonth,
        day, 8, 59
      ));
    }

    if (checkInDate && !checkOutDate && date < checkInDate) {
      setCheckInDate(date);
    }
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else if (date > checkInDate && isIntervalFree(checkInDate, date) ||
      !selectedItem && date > checkInDate) {
      setCheckOutDate(date);
      onClose();
    }
  };



  const isDateInRange = (day, index) => {
    if (day === "A") return false;

    const monthOffset = index >= 35 ? 1 : 0;
    const date = new Date(currentYear, currentMonth + monthOffset, day);

    // Проверяем, находится ли дата в диапазоне между checkInDate и hoveredDate
    if (checkInDate && !checkOutDate && hoveredDate) {
      return date >= checkInDate && date <= hoveredDate;
    }

    // Проверяем, находится ли дата в диапазоне между checkInDate и checkOutDate
    if (checkInDate && checkOutDate) {
      return date >= checkInDate && date <= checkOutDate;
    }

    return false;
  };

  const handleDayMouseEnter = (day, isNextMonth) => {
    if (!checkInDate || day === "A") return;

    // Определяем, правильно ли установлена дата наведения
    const newHoveredDate = new Date(
      currentYear,
      isNextMonth ? currentMonth + 1 : currentMonth,
      day
    );
    if (newHoveredDate >= checkInDate) {
      setHoveredDate(newHoveredDate);
    }
  };


  const isDayBooked = (day, monthOffset) => {
    if (!selectedItem) {
      return false;
    }

    const dateToCheck = new Date(Date.UTC(currentYear, currentMonth + monthOffset, day));
    dateToCheck.setUTCHours(9, 2, 0, 0);

    return booking.some(b => {
      // Проверка соответствия объекта бронирования выбранному элементу
      if (selectedBooking && b.id === selectedBooking.id) {
        return false;
      }

      if ((selectedItem.houseId && b.houseId === selectedItem.houseId && b.roomId === selectedItem.id) ||
        (!selectedItem.houseId && b.apartId === selectedItem.id)) {

        const startDate = new Date(b.checkInDate);
        const endDate = new Date(b.checkOutDate);

        return (dateToCheck >= startDate && dateToCheck <= endDate);
      }
      return false;
    });
  };


  const isStartDate = (checkDate, day, monthOffset) => {
    if (!checkDate) return false;
    const checkDateAdjusted = new Date(checkDate);
    checkDateAdjusted.setHours(0, 0, 0, 0);

    const currentDate = new Date(currentYear, currentMonth + monthOffset, day);
    currentDate.setHours(0, 0, 0, 0);

    return +checkDateAdjusted === +currentDate; // Сравниваем временные метки
  };


  return (
    <div className="reserve__interface">
      <div className="container">
        <h2>Выберите дату поездки:</h2>
        <div className="calendar">
          <p className="current__select">Дата заезда</p>
          <div className="calendar__table">
            <div className="calendar__days">
              <div className="current_month">
                <div className="top">
                  <button className="left" onClick={decrementMonth}>&lt;</button>
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
                    ${isStartDate(checkInDate, day, 0) ? "start-date" : ""}
                    
                    ${isDateInRange(day, index) ? "in-range" : ""}`}

                      onClick={e =>
                        day !== "A" &&
                        !isPastDay(day, 0) &&
                        handleDayClick(e, day, false)
                      }
                      disabled={isDayBooked(day, 0)}
                    >
                      {day !== "A" ? day : ""}
                    </button>
                  ))}
                </div>
              </div>
              <div className="next_month">
                <div className="top">
                  <span>
                    {`${monthsOfYear[(currentMonth + 1) % 12]} ${currentMonth === 11 ? currentYear + 1 : currentYear}`}
                  </span>
                  <button className="right" onClick={incrementMonth}>&gt;</button>
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
                      key={index + 35}
                      onMouseEnter={() => handleDayMouseEnter(day, true)}
                      onMouseLeave={() => setHoveredDate(null)}
                      className={`day-item ${day === "A" ? "empty" : ""}
                    ${isPastDay(day, 1) ? "disabled" : ""} 
                    
                    ${isStartDate(checkInDate, day, 1) ? "start-date" : ""}

                    ${isDateInRange(day, index + 35) ? "in-range" : ""}`}

                      onClick={e => !isPastDay(day, 1) && handleDayClick(e, day, true)}

                      disabled={isDayBooked(day, 1)}
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
