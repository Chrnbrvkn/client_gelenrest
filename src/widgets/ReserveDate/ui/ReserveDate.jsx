import Calendar from "../../../components/Calendar";
import { useReserveGuestsCount } from "../lib/useReserveGuestsCount";
import ReserveBar from "./ReserveBar";

export function ReserveDate(props) {
  const {
    checkInDate,
    checkOutDate,
    showCalendar,
    setShowCalendar,
    handleOpenCalendarForCheckIn,
    handleOpenCalendarForCheckOut,
    handleFilterSelected,
    handleResetInDate,
    handleResetOutDate,
  } = props;

  const { handleGuestsCountChange, handleKeyDown } = useReserveGuestsCount();

  return (
    <>
      <div className="reserve__page">
        <div className="container">
          <h2>Забронировать место для отдыха</h2>
          <div className="reserve__items">
            <p className="text">
              10-19 суток скидка 5% Бонусы по телефону 20-30 скидка 10% Бонусы
              при телефону Помесячно только по телефону
            </p>
          </div>
          <ReserveBar
            handleOpenCalendarForCheckIn={handleOpenCalendarForCheckIn}
            handleOpenCalendarForCheckOut={handleOpenCalendarForCheckOut}
            handleFilterSelected={handleFilterSelected}
            handleResetInDate={handleResetInDate}
            handleResetOutDate={handleResetOutDate}
            handleGuestsCountChange={handleGuestsCountChange}
            handleKeyDown={handleKeyDown}
          />
          {showCalendar && (
            <Calendar
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}
