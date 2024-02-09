import { useState, useEffect, useMemo, useCallback } from "react"
import { useParams } from "react-router-dom"
import { useApiData } from '../../contexts/ApiProvider';
import { useData } from '../../contexts/DataProvider';
import useScrollTop from '../../hooks/useScrollTop';
import './reservePage.css'
import RoomItem from "./RoomItem";
import ApartItem from "./ApartItem";
import { useBookingContext } from "../../contexts/BookingProvider";
import ChooseReserveTime from "./ChooseReserveTime";
import CalendarDates from "./CalendarDates";

export default function Reserve() {
  useScrollTop()
  const { type, itemId } = useParams()

  const { openBookingModal } = useBookingContext()
  const { isLoading } = useData()
  const { rooms, aparts, booking, houses, housesPictures, apartsPictures, roomsPictures } = useApiData();

  const [selectedHouseId, setSelectedHouseId] = useState(null)

  const checkDate = {
    checkIn: '',
    checkOut: ''
  }
  const [selectedDate, setSelectedDate] = useState(checkDate)
  // console.log(Object.values(selectedDate).forEach(d => console.log(d)));
  // console.log(['123','123'].forEach(d => console.log(d)));
  // console.log(new Date());
  useEffect(() => {
    Object.values(selectedDate).forEach(d => console.log('date: ' + d));

  }, [])



  const handleSelectItem = (item) => {
    openBookingModal(item)
  }

  useEffect(() => {
    if (type && (rooms.length > 0 || aparts.length > 0)) {
      let currentItem = null;
      if (type === 'room') {
        currentItem = rooms.find(r => r.id == itemId);
      } else {
        currentItem = aparts.find(a => a.id == itemId);
      }

      if (currentItem) {
        handleSelectItem(currentItem);
      } else {
        console.error('Элемент не найден');
      }
    }
  }, [type, itemId, rooms, aparts]);

  const handleRoomList = (houseId) => {
    setSelectedHouseId((prev) => {
      if (prev === houseId) {
        return null
      }
      return houseId
    })
  }

  if (isLoading || !rooms || !aparts) {
    return <div>Загрузка...</div>;
  }



  return (
    <>
      <h2 > Забронировать место для отдыха</h2>
      {Object.values(selectedDate).some(date => date === '123') ? (
        <ChooseReserveTime selectedDate={selectedDate} />
      ) : (
        <>
          <div className="houses__items">Выберите дом:</div>
          {
            houses.map(house => (
              <div key={house.id} >
                <button className="house__button"
                  onClick={() => handleRoomList(house.id)}>
                  <p className="house__title">{`Дом: ${house.name}`}</p>
                  <p className="house__title">{`Адрес: ${house.address}`}</p>
                  <p className="house__title">{`До моря: ${house.timeToSea} минут`}</p>
                </button>
                {selectedHouseId === house.id && rooms.filter(room => room.houseId === house.id)
                  .map(room => (
                    <RoomItem key={room.id} room={room} />
                  ))}
              </div>
            ))
          }
          <h2>Квартиры:</h2>
          <div className="aparts__items">
            {aparts.map(apart => (
              <ApartItem key={apart.id} apart={apart} />
            ))}
          </div>
        </>
      )}
    </>
  )
}