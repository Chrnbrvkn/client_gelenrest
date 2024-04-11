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
  selectedItem
}) {
  // const monthsOfYear = [
  //   "Январь",
  //   "Февраль",
  //   "Март",
  //   "Апрель",
  //   "Май",
  //   "Июнь",
  //   "Июль",
  //   "Август",
  //   "Сентябрь",
  //   "Октябрь",
  //   "Ноябрь",
  //   "Декабрь",
  // ];

  const {
    currentYear,
    currentMonth,
    incrementMonth,
    decrementMonth,
    monthsOfYear,
    firstMonthDays,
    secondMonthDays,
    twoMonthDays,
    isPastDay
  } = useCalendar();

  const [hoveredDate, setHoveredDate] = useState(null);

  const dispatch = useDispatch();
  const booking = useSelector((state) => state.clientBooking.data);
  // const firstMonthDays = twoMonthDays.slice(0, 35);
  // const secondMonthDays = twoMonthDays.slice(35);


  useEffect(() => {
    dispatch(fetchClientBooking());
  }, []);


  const handleDayClick = (day, isNextMonth) => {
    const date = new Date(
      currentYear,
      isNextMonth ? currentMonth + 1 : currentMonth,
      day
    );
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null); // Сброс даты выезда, если выбирается новая дата заезда
    } else if (date > checkInDate) {
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

  // const isPastDay = (day, monthOffset) => {
  //   const dateToCheck = new Date(currentYear, currentMonth + monthOffset, day);
  //   const currentDate = new Date();
  //   currentDate.setHours(0, 0, 0, 0); // Сброс времени до начала текущего дня
  //   return dateToCheck < currentDate;
  // };

  const isDayBooked = (day, monthOffset) => {
    if (!selectedItem) {
      return false
    }

    const dateToCheck = new Date(currentYear, currentMonth + monthOffset, day);
    dateToCheck.setHours(0, 0, 0, 0);

    // Проверяем каждое бронирование для выбранного номера
    return booking.some(booking => {
      if (booking.itemId !== selectedItem.id || booking.status !== "Подтверждён") return false;

      const startDate = new Date(booking.checkInDate);
      const endDate = new Date(booking.checkOutDate);
      endDate.setHours(23, 59, 59, 999); // Устанавливаем конец дня для даты выезда

      return dateToCheck >= startDate && dateToCheck <= endDate;
    });
  };

  return (
    <div className="reserve__interface">
      <div className="container">
        <h2>Выберите дату поездки:</h2>
        <div className="calendar">
          <p className="current__select">Дата заезда</p>
          <div className="calendar__table">
            {/* <div className="top-panel">
              <button onClick={decrementMonth}>&lt;</button>
              <span>{`${monthsOfYear[currentMonth]} ${currentYear}`}</span>
              <span>{`${monthsOfYear[(currentMonth + 1) % 12]} ${currentMonth === 11 ? currentYear + 1 : currentYear}`}</span>
              <button onClick={incrementMonth}>&gt;</button>
            </div> */}
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
                    ${checkInDate &&
                          day === checkInDate.getDate().toString() &&
                          !index
                          ? "start-date"
                          : ""
                        }
                    ${checkOutDate && day === checkOutDate.getDate().toString()
                        } 
                    ${isDateInRange(day, index) ? "in-range" : ""}`}
                      onClick={() =>
                        day !== "A" &&
                        !isPastDay(day, 0) &&
                        handleDayClick(day, false)
                      }
                      disabled={isPastDay(day, 0) || day === "A" || isDayBooked(day, 0)}
                    >
                      {day !== "A" ? day : ""}
                    </button>
                  ))}
                </div>
              </div>
              <div className="next_month">
                <div className="top">
                  <span>{`${monthsOfYear[(currentMonth + 1) % 12]} ${currentMonth === 11 ? currentYear + 1 : currentYear
                    }`}</span>
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
                    ${checkOutDate && day === checkOutDate.getDate().toString()
                        } 
                    ${isDateInRange(day, index + 35) ? "in-range" : ""}`}
                      onClick={() =>
                        !isPastDay(day, 1) && handleDayClick(day, true)
                      }
                      disabled={isPastDay(day, 1) || day === "A"}
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
