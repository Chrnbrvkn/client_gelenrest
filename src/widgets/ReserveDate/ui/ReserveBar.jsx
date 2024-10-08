import {useRef, useEffect} from 'react'
import { useSelector} from'react-redux';



export default function ReserveBar({
  handleOpenCalendarForCheckIn,
  handleOpenCalendarForCheckOut,
  handleFilterSelected,
  handleGuestsCountChange,
  handleResetInDate,
  handleResetOutDate,
  handleKeyDown,
  isForm = false,
  register
}) {


 const {checkInDate, checkOutDate, guestsCount} = useSelector(state => state.reserve);
  
  const guestsInputRef = useRef(null);

  useEffect(() => {
    if (checkOutDate) {
      guestsInputRef.current.focus();
    }
  }, [checkOutDate, guestsCount]);

  
  return (
    <div className="reserve__items">
    <div>
      <a href='#current_month'
        className="selected__date"
        onClick={handleOpenCalendarForCheckIn}
      >
        {checkInDate ? new Date(checkInDate).toLocaleDateString() : "Заезд"}
        {checkInDate && (
          <button
            onClick={handleResetInDate}
            className="date-reset-button"
          >
            Х
          </button>
        )}
      </a>
    </div>
    <div>
      <a href='#next_month'
        className="selected__date"
        onClick={() => handleOpenCalendarForCheckOut(checkInDate)}
      >
        {checkOutDate ? new Date(checkOutDate).toLocaleDateString() : "Выезд"}
        {checkOutDate && (
          <button
            onClick={handleResetOutDate}
            className="date-reset-button"
          >
            Х
          </button>
        )}
      </a>
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
        // {...(isForm ? 
        //   {...register('guestsCount', {required: true})} 
        //   : {})}
      />
    </div>
    <div className="findNumbers">
      {/* <button onClick={() => handleFilterSelected(checkInDate, checkOutDate, guestsCount)}>Найти номера</button> */}
    </div>
  </div>
  )
}
