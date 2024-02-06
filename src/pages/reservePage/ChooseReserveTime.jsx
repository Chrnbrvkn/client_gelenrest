
import React, { useState } from 'react'
import useCalendar from '../../hooks/useCalendar'; // Предполагается, что хук находится в файле useCalendar.js
import './ChooseReserveTime.css';

export default function ChooseReserveTime({ selectedDate }) {
  const monthsOfYear = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const { currentYear, currentMonth, currentMonthDays, nextMonthDays, incrementMonth, decrementMonth } = useCalendar();
  // const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  const handleDayClick = (day, isNextMonth) => {
    const date = new Date(currentYear, isNextMonth ? currentMonth + 1 : currentMonth, day);
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null); // Сброс даты выезда, если выбирается новая дата заезда
    } else if (date > checkInDate) {
      setCheckOutDate(date);
    }
  };

  const isDateInRange = (date, isNextMonth) => {
    const currentDate = new Date(currentYear, isNextMonth ? currentMonth + 1 : currentMonth, date);
    const endRangeDate = checkOutDate || hoveredDate;
    return checkInDate && endRangeDate && currentDate >= checkInDate && currentDate <= endRangeDate;
  };

  return (
    <div className="reserve__interface" >
      <div className="container">
        <h1>Выберите дату поездки:</h1>
        <div className="">
          <div className="reserve__items">
            <div className="selected__date">
              <p>Заезд: {checkInDate ? checkInDate.toLocaleDateString() : 'Не выбрано'}</p>
              {checkInDate && <button onClick={() => setCheckInDate(null)}>✕</button>}
            </div>
            <div className="selected__date">
              <p>Выезд: {checkOutDate ? checkOutDate.toLocaleDateString() : 'Не выбрано'}</p>
              {checkOutDate && <button onClick={() => setCheckOutDate(null)}>✕</button>}
            </div>
            <div className="guests__count">
              <p >Гости</p>
            </div>
          </div>
          <div className="calendar">
            <p className="current__select">Дата заезда</p>
            <div className="calendar__table">
              <div className="top__panel">
                <button onClick={decrementMonth} className="back__month">&lt;</button>
                <div className="first__month">
                  {`${monthsOfYear[currentMonth]} ${currentYear}`}
                </div>
                <div className="second__month">
                  {`${monthsOfYear[(currentMonth + 1) % 12]} ${currentMonth === 11 ? currentYear + 1 : currentYear}`}
                </div>

                <button onClick={incrementMonth} className="next__month">&gt;</button>
              </div>
              <div className="calendar__days">
                <div className="first__daysList">
                  <div className="monday">ПН</div>
                  <div className="tuesday">ВТ</div>
                  <div className="wednesday">СР</div>
                  <div className="thursday">ЧТ</div>
                  <div className="friday">ПТ</div>
                  <div className="saturday">СБ</div>
                  <div className="sunday">ВС</div>
                  {currentMonthDays.map((day, index) => (
                    <button key={index}
                      className={`day__item ${isDateInRange(day, false) ? 'selected-range' : ''}`}
                      onClick={() => handleDayClick(day, false)}
                      onMouseEnter={() => !checkOutDate && setHoveredDate(new Date(currentYear, currentMonth, day))}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      {day}
                    </button>
                  ))}

                </div>
                <div className="second__daysList">
                  <div className="monday">ПН</div>
                  <div className="tuesday">ВТ</div>
                  <div className="wednesday">СР</div>
                  <div className="thursday">ЧТ</div>
                  <div className="friday">ПТ</div>
                  <div className="saturday">СБ</div>
                  <div className="sunday">ВС</div>
                  {nextMonthDays.map((day, index) => (
                    <button key={index}
                      className={`day__item ${isDateInRange(day, true) ? 'selected-range' : ''}`}
                      onClick={() => handleDayClick(day, true)}
                      onMouseEnter={() => !checkOutDate && setHoveredDate(new Date(currentYear, currentMonth, day))}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      {day}
                    </button>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
