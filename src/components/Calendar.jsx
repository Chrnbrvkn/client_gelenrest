import React, { useEffect, useMemo, useState } from "react";
import useCalendar from "../hooks/useCalendar";
import { useDispatch, useSelector } from "react-redux";

import "../assets/styles/componentsStyles/calendar.css";

import { fetchClientBooking } from "../store/features/lists/clientBooking/clientBookingFetch";
import { fetchHousesAsync } from "../store/features/lists/houses/housesFetch";


export default function Calendar({
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  onClose,
  selectedItem
}) {

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
  // const houses = useSelector((state) => state.houses.data);
  // const houseName = houses.find(h => h.id === selectedItem.houseId).name

  console.log(booking)
  console.log(selectedItem)

  useEffect(() => {
    dispatch(fetchClientBooking());
  }, []);


  const handleDayClick = (e, day, isNextMonth) => {
    e.preventDefault();

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


  const getBookedDates = (bookings, selectedItem) => {
    let bookedDates = [];
    bookings.forEach(booking => {
      if (booking.status === "Подтверждён" && booking.itemId === selectedItem.id) {

        const start = new Date(booking.checkInDate);
        const end = new Date(booking.checkOutDate);
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
          bookedDates.push(date.toISOString().split('T')[0]); // YYYY-MM-DD
        }
      }
    });
    console.log("Booked Dates:", bookedDates);
    return bookedDates;
  }

  const bookedDates = useMemo(() => getBookedDates(booking, selectedItem), [booking, selectedItem]);

  const isDateDisabled = (day, monthOffset) => {
    if (day === "A") return true; // Immediate disable for non-day entries.
    const date = new Date(currentYear, currentMonth + monthOffset, day);
    const dateStr = date.toISOString().split('T')[0];
    return isPastDay(day, monthOffset) || bookedDates.includes(dateStr);
  };

  const isDayBooked = (day, monthOffset) => {
    if (!selectedItem) {
      console.log("No selected item.");
      return false;
    }

    const dateToCheck = new Date(currentYear, currentMonth + monthOffset, day);
    dateToCheck.setHours(0, 0, 0, 0);

    const isBooked = booking.some(booking => {

      if (booking.status !== "Подтверждён") return false;

      if (selectedItem.houseId && booking.houseId !== selectedItem.houseId) {
        console.log('House ID mismatch');
        return false;
      }
      if (booking.itemId !== selectedItem.id) {
        console.log('Item ID mismatch');
        return false;
      }

      const startDate = new Date(booking.checkInDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(booking.checkOutDate);
      endDate.setHours(23, 59, 59, 999);

      const booked = dateToCheck >= startDate && dateToCheck <= endDate;
      console.log(`Checking date: ${dateToCheck()}, Start: ${startDate()}, End: ${endDate()}, Booked: ${booked}`);
      return booked;
    });

    // console.log(`Date ${dateToCheck} is booked: ${!!isBooked}`);
    return !!isBooked;
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
                    ${checkInDate &&
                          day === checkInDate.getDate().toString() &&
                          !index
                          ? "start-date"
                          : ""
                        }
                    
                    ${isDateInRange(day, index) ? "in-range" : ""}`}

                      onClick={(e) =>
                        day !== "A" &&
                        !isPastDay(day, 0) &&
                        handleDayClick(e, day, false)
                      }
                      disabled={isDateDisabled(day, 0)}
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
                    
               
                    ${isDateInRange(day, index + 35) ? "in-range" : ""}`}

                      onClick={e => !isPastDay(day, 1) && handleDayClick(e, day, true)}

                      disabled={isDateDisabled(day, 1)}
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
