import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useApiData } from '../../contexts/ApiProvider';
import { useData } from '../../contexts/DataProvider';
import useScrollTop from '../../hooks/useScrollTop';
import './reservePage.css'

export default function Reserve() {
  useScrollTop()
  const { type, itemId } = useParams()
  console.log(type, itemId);
  const { isLoading } = useData()
  const { rooms, aparts, booking, houses, housesPictures, apartsPictures, roomsPictures } = useApiData();

  const [selectedHouseId, setSelectedHouseId] = useState(null)


  const handleRoomList = (houseId) => {
    setSelectedHouseId((prev) => {
      if (prev === houseId) {
        return null
      }
      return houseId
    })
  }

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <h2> Забронировать место для отдыха</h2>
      <div className="houses__items">Выберите дом:</div>
      {
        houses.map((house, index) => (
          <div key={index} >
            <button className="house__button"
              onClick={() => handleRoomList(house.id)}>{house.name}</button>
            {selectedHouseId === house.id && rooms.filter(room => room.houseId === house.id).map((room, index) => (
              <div key={index} className="room__item">{room.name}</div>
            ))}
          </div>
        ))
      }
      <h2>Квартиры:</h2>
      <div className="aparts__items">
        {aparts.map((apart, index) => (
          <div key={index} className="apart__item">{apart.name}</div>
        ))}
      </div>
    </>
  )
}