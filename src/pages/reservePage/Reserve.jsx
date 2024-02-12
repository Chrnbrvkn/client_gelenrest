import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { useParams } from "react-router-dom"
import { useData } from '../../contexts/DataProvider';
import useScrollTop from '../../hooks/useScrollTop';
import './reservePage.css'
import RoomItem from "./RoomItem";
import ApartItem from "./ApartItem";
import { useBookingContext } from "../../contexts/BookingProvider";
import ChooseReserveTime from "./ChooseReserveTime";
import ReserveItemsList from "./ReserveItemsList";
// import CalendarDates from "./CalendarDates";


export default function Reserve() {
  useScrollTop()
  // const { type, itemId } = useParams()

  const { openBookingModal } = useBookingContext()
  const { isLoading } = useData()
  const [selectedDays, setsSelectedDays] = useState(null)
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [guestsCount, setGuestsCount] = useState(1);
  const [isFindRooms, setIsFindRooms] = useState(false)

  const closeCalendar = () => {
    setShowCalendar(false); // Сброс подсказок при закрытии календаря
  };


  const guestsInputRef = useRef(null);

  const handleOpenCalendarForCheckIn = () => {
    setShowCalendar(true);
    setCheckInDate(null); // Очистить поле заезда при открытии календаря
  };

  const handleOpenCalendarForCheckOut = () => {
    if (!checkInDate) {
      handleOpenCalendarForCheckIn();
    } else {
      setShowCalendar(true);
      setCheckOutDate(null); // Очистить поле выезда при открытии календаря
    }
  };

  const handleResetDate = () => {
    setCheckInDate(null);
    setCheckOutDate(null); // Скрыть подсказки
  };


  const handleFilterSelected = () => {
    if (checkInDate && checkOutDate && guestsCount) {
      setsSelectedDays((checkOutDate - checkInDate) / (24 * 3600 * 1000))
      setIsFindRooms(true)
    }
  }
  if (isLoading) (
    <p>Загрузка</p>
  )

  return (
    <>
      <h2>Забронировать место для отдыха</h2>
      <div className="reserve__items">
        <div>
          <div className="selected__date" onClick={handleOpenCalendarForCheckIn}>
            {checkInDate ? checkInDate.toLocaleDateString() : 'Заезд'}
            {checkInDate && (
              <button onClick={handleResetDate} className="date-reset-button">Х</button>
            )}
          </div>
        </div>
        <div>
          <div className="selected__date" onClick={handleOpenCalendarForCheckOut}>
            {checkOutDate ? checkOutDate.toLocaleDateString() : 'Выезд'}
            {checkOutDate && (
              <button onClick={handleResetDate} className="date-reset-button">Х</button>
            )}
          </div>
        </div>
        <div className="guests__count"
        >Гости:
          <input
            ref={guestsInputRef}
            type="number"
            value={guestsCount}
            onChange={(e) => setGuestsCount(Math.max(1, e.target.value))}
            placeholder=""
            min="1"
          />
        </div>
        <div className="findNumbers">
          <button onClick={handleFilterSelected}>Найти номера</button>
        </div>
      </div>
      {showCalendar && (
        <ChooseReserveTime
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          onClose={closeCalendar}
        />
      )}
      {isFindRooms && (
        <ReserveItemsList
          days={selectedDays}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guestsCount={guestsCount} />
      )}
    </>
  )
}