import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getHouses } from "../../api/housesApi";
import { getAllRooms } from "../../api/roomsApi";
import { getAparts } from "../../api/apartsApi";
import './reservePage.css'
export default function Reserve() {
  const { type, itemId } = useParams()
  console.log(type, itemId);

  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [houses, setHouses] = useState([])
  const [aparts, setAparts] = useState([])
  const [rooms, setRooms] = useState([])
  // const [roomList, setRoomList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const housesData = await getHouses()
        const apartsData = await getAparts()
        const roomsData = await getAllRooms()
        housesData ? setHouses(housesData) : setHouses([])
        apartsData ? setAparts(apartsData) : setAparts([])
        roomsData ? setRooms(roomsData) : setRooms([])
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
  }, [])
  // console.log(`HOUSES: ${JSON.stringify(houses, null, 2)}`);
  // console.log(`APARTS: ${JSON.stringify(aparts, null, 2)}`);
  // console.log(`ROOMS: ${JSON.stringify(rooms, null, 2)}`);
const renderSelectedItem = () => {
  if(type === 'apartment'){
    
  }
  if(type === 'room'){

  }
  return (
    <div>1</div>
  )
}
  const handleRoomList = (id) => {
    setSelectedHouseId(selectedHouseId === id ? null : id)
  }
  
  return (
    <>
      {/* {type && itemId(
        <div className="selectedItem">
          123
        </div>
      )} */}
      <h2> Забронировать место для отдыха</h2>
      <div className="houses__items">Выберите дом:</div>
      {
        houses.map((house, index) => (
          <div key={index} >
            <button className="house__button" onClick={() => handleRoomList(house.id)}>{house.name}</button>
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