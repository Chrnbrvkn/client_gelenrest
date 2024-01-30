import '../../assets/styles/pagesStyles/room.css'
import door from '../../assets/images/room/room-icons/door.svg'
import occupied from '../../assets/images/room/room-icons/occupied.svg'
import stairs from '../../assets/images/room/room-icons/stairs.svg'
import faucet from '../../assets/images/room/room-icons/faucet.svg'
import food from '../../assets/images/room/room-icons/food.svg'
import { getRoomAllImages, getRoom, getRooms } from '../../api/roomsApi';
import { getHouse } from '../../api/housesApi';
import { NavLink, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import leftArrow from '../../assets/images/icons/houses-icons/arrow-left.svg'
import rightArrow from '../../assets/images/icons/houses-icons/arrow-right.svg'
import '../../assets/styles/pagesStyles/house.css'

export default function Rooms() {
  const { houseId, roomId } = useParams()
  const [firstRoom, setFirstRoom] = useState([])
  const [rooms, setRooms] = useState([])
  const [roomsPictures, setRoomsPictures] = useState([])
  const [house, setHouse] = useState([]);

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prevSlide) => {
      if (prevSlide === roomsPictures.length - 1) {
        return prevSlide = 0
      }
      return prevSlide + 1
    })
  };

  const prevSlide = () => {
    setCurrent((prevSlide) => {
      if (prevSlide === 0) {
        return prevSlide = roomsPictures.length - 1
      }
      return prevSlide - 1
    })
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const houseData = await getHouse(houseId)
        if (houseData) {
          setHouse(houseData)
        }
        const roomData = await getRooms(houseId)
        if (roomData) {
          setRooms(roomData)
        }
        const firstRoomData = await getRoom(roomId, houseId)

        if (firstRoomData) {
          setFirstRoom(firstRoomData)
        }
        if (roomData) {
          setRooms(roomData)
        }
        const roomPics = await getRoomAllImages()
        setRoomsPictures(roomPics)
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
  }, []);

  return (
    <div className='room'>
      <div className="container">
        <ul className="breadcrumb">
          <li className="breadcrumb__item"><NavLink to={`/houses`}>Список домов</NavLink></li>
          <li className="breadcrumb__item"><NavLink to={`/houses/${houseId}`}>{house.name}</NavLink></li>
          <li className="breadcrumb__item">Список комнат</li>
        </ul>
        <div className="room__main">
          <p className="room__main-title">
            {firstRoom.name}
          </p>
          <div className="room__main-content">
            <div className="room__main-left">
              <div className='slider__house'>
                <button className='house__slider-prev' onClick={prevSlide}>
                  <img src={leftArrow} alt="" />
                </button>
                {roomsPictures[current] && (
                  <img className="slider__house-front" src={`https://api.gelenrest.ru${roomsPictures[current].url}`} />
                )}
                <button className='house__slider-next' onClick={nextSlide}>
                  <img src={rightArrow} alt="" />
                </button>
              </div>
              <div className='slider__house-photos'>
              </div>
              <button className="room__main-btn room__main-btn--max">
                Забронировать
              </button>
            </div>
            <div className="room__main-right">
              <div className="room__main-inform">
                <div className="room__main-inform--item">
                  <div className="room__main-inform--left">
                    <img src={door} alt="" />
                    <p>Количество комнат</p>
                  </div>
                  <div className="room__main-inform--right">
                    {firstRoom.roomCount}
                  </div>
                </div>
                <div className="room__main-inform--item">
                  <div className="room__main-inform--left">
                    <img src={occupied} alt="" />
                    <p>Спальные места</p>
                  </div>
                  <div className="room__main-inform--right">
                    {firstRoom.bedroom}
                  </div>
                </div>
                <div className="room__main-inform--item">
                  <div className="room__main-inform--left">
                    {/* //добавить поле этаж в админку и бд!!! */}
                    <img src={stairs} alt="" />
                    <p>Этаж</p>
                  </div>
                  <div className="room__main-inform--right">
                    3
                  </div>
                </div>
                <div className="room__main-inform--item">
                  <div className="room__main-inform--left">
                    <img src={faucet} alt="" />
                    <p>Санузел</p>
                  </div>
                  <div className="room__main-inform--right">
                    {firstRoom.bathroom}
                  </div>
                </div>
                <div className="room__main-inform--item">
                  <div className="room__main-inform--left">
                    <img src={food} alt="" />
                    <p>Питание</p>
                  </div>
                  <div className="room__main-inform--right">
                    {firstRoom.meal}
                  </div>
                </div>
              </div>
              <div className="room__main-facilities">
                <p>
                  Удобства
                </p>
                <p>
                  {firstRoom.facilities}
                </p>
              </div>
              <div className="room__main-price">
                <div className="room__main-price--top">
                  <p>Цены,</p>
                  <p> 2024 год</p>
                </div>
                <div className="room__main-price--bottom">
                  <p>{firstRoom.price}р / сутки</p>
                </div>
              </div>
              <button className="room__main-btn room__main-btn--min">
                Забронировать
              </button>
            </div>
          </div>
        </div>

        <div className="room__items">
          {rooms.filter(room => room.id != roomId).map((room, index) => (
            <div key={index} className="room__main">
              <p className="room__main-title">
                {room.name}
              </p>
              <div className="room__main-content">
              <div className="room__main-left">
                <div className='slider__house'>
                  <button className='house__slider-prev' onClick={prevSlide}>
                    <img src={leftArrow} alt="" />
                  </button>
                  {roomsPictures[current] && (
                    <img className="slider__house-front" src={`https://api.gelenrest.ru${roomsPictures[current].url}`} />
                  )}
                  <button className='house__slider-next' onClick={nextSlide}>
                    <img src={rightArrow} alt="" />
                  </button>
                </div>
                <div className='slider__house-photos'>
                </div>
                <Link to={`/reservation/room/${room.id}`} className="room__main-btn room__main-btn--link">Забронировать</Link>
              </div>
              <div className="room__main-right">
                <div className="room__main-inform">
                  <div className="room__main-inform--item">
                    <div className="room__main-inform--left">
                      <img src={door} alt="" />
                      <p>Количество комнат</p>
                    </div>
                    <div className="room__main-inform--right">
                      {room.roomCount}
                    </div>
                  </div>
                  <div className="room__main-inform--item">
                    <div className="room__main-inform--left">
                      <img src={occupied} alt="" />
                      <p>Спальные места</p>
                    </div>
                    <div className="room__main-inform--right">
                      {room.bedroom}
                    </div>
                  </div>
                  <div className="room__main-inform--item">
                    <div className="room__main-inform--left">
                      {/* //добавить поле этаж в админку и бд!!! */}
                      <img src={stairs} alt="" />
                      <p>Этаж</p>
                    </div>
                    <div className="room__main-inform--right">
                      3
                    </div>
                  </div>
                  <div className="room__main-inform--item">
                    <div className="room__main-inform--left">
                      <img src={faucet} alt="" />
                      <p>Санузел</p>
                    </div>
                    <div className="room__main-inform--right">
                      {room.bathroom}
                    </div>
                  </div>
                  <div className="room__main-inform--item">
                    <div className="room__main-inform--left">
                      <img src={food} alt="" />
                      <p>Питание</p>
                    </div>
                    <div className="room__main-inform--right">
                      {room.meal}
                    </div>
                  </div>
                </div>
                <div className="room__main-facilities">
                  <p>
                    Удобства
                  </p>
                  <p>
                    {room.facilities}
                  </p>
                </div>
                <div className="room__main-price">
                  <div className="room__main-price--top">
                    <p>Цены,</p>
                    <p> 2024 год</p>
                  </div>
                  <div className="room__main-price--bottom">
                    <p>{room.price}р / сутки</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          ))}

          {/* <div className="room__item">
            <p className="room__item-title">
              #2: Трёхместный стандарт
            </p>
            <div className="room__item-img">

            </div>
            <div className="room__item-inform">
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={occupied} alt="" />
                </div>
                <div className="room__item-inform--right">
                  2(Двуспальная кровать)
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={occupied} alt="" />
                </div>
                <div className="room__item-inform--right">
                  2(Двуспальная кровать)
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={stairs} alt="" />
                </div>
                <div className="room__item-inform--right">
                  Этаж
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={faucet} alt="" />
                </div>
                <div className="room__item-inform--right">
                  Санузел
                </div>
              </div>
            </div>
            <div className="room__item-man">
            </div>
            <div className="room__item-buttons">
              <button>
                Подробнее
              </button>
              <button>
                Забронировать
              </button>
            </div>
          </div>

          <div className="room__item">
            <p className="room__item-title">
              #2: Трёхместный стандарт
            </p>
            <div className="room__item-img">

            </div>
            <div className="room__item-inform">
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={occupied} alt="" />
                </div>
                <div className="room__item-inform--right">
                  2(Двуспальная кровать)
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={occupied} alt="" />
                </div>
                <div className="room__item-inform--right">
                  2(Двуспальная кровать)
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={stairs} alt="" />
                </div>
                <div className="room__item-inform--right">
                  Этаж
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={faucet} alt="" />
                </div>
                <div className="room__item-inform--right">
                  Санузел
                </div>
              </div>
            </div>
            <div className="room__item-man">
            </div>
            <div className="room__item-buttons">
              <button>
                Подробнее
              </button>
              <button>
                Забронировать
              </button>
            </div>
          </div>

          <div className="room__item">
            <p className="room__item-title">
              #2: Трёхместный стандарт
            </p>
            <div className="room__item-img">

            </div>
            <div className="room__item-inform">
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={occupied} alt="" />
                </div>
                <div className="room__item-inform--right">
                  2(Двуспальная кровать)
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={occupied} alt="" />
                </div>
                <div className="room__item-inform--right">
                  2(Двуспальная кровать)
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={stairs} alt="" />
                </div>
                <div className="room__item-inform--right">
                  Этаж
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={faucet} alt="" />
                </div>
                <div className="room__item-inform--right">
                  Санузел
                </div>
              </div>
            </div>
            <div className="room__item-man">
            </div>
            <div className="room__item-buttons">
              <button>
                Подробнее
              </button>
              <button>
                Забронировать
              </button>
            </div>
          </div>

          <div className="room__item">
            <p className="room__item-title">
              #2: Трёхместный стандарт
            </p>
            <div className="room__item-img">

            </div>
            <div className="room__item-inform">
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={occupied} alt="" />
                </div>
                <div className="room__item-inform--right">
                  2(Двуспальная кровать)
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={occupied} alt="" />
                </div>
                <div className="room__item-inform--right">
                  2(Двуспальная кровать)
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={stairs} alt="" />
                </div>
                <div className="room__item-inform--right">
                  Этаж
                </div>
              </div>
              <div className="room__item-inform--item">
                <div className="room__item-inform--left">
                  <img src={faucet} alt="" />
                </div>
                <div className="room__item-inform--right">
                  Санузел
                </div>
              </div>
            </div>
            <div className="room__item-man">
            </div>
            <div className="room__item-buttons">
              <button>
                Подробнее
              </button>
              <button>
                Забронировать
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}