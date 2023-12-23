import React, { useEffect, useState } from 'react';
import { getHouseImages, getHouse } from '../../../api/housesApi';
import { getRoomAllImages, getRoomOneImage, getRooms } from '../../../api/roomsApi';
import altPicture from '/src/assets/images/homeCards/home-1.png'
import { NavLink } from "react-router-dom";
import '../../../assets/styles/pagesStyles/house.css'
import HouseSlider from './HouseSlider';
import { useParams } from 'react-router-dom';

import seaIcon from '../../../assets/images/icons/sea.svg'
import shopIcon from '../../../assets/images/icons/shop.svg'
import cafeIcon from '../../../assets/images/icons/cafe.svg'
import busIcon from '../../../assets/images/icons/bus.svg'
import mapIcon from '../../../assets/images/icons/map.svg'
import wifiIcon from '../../../assets/images/icons/houses-icons/wifi.svg'
import hairdryerIcon from '../../../assets/images/icons/houses-icons/hairdryer.svg'
import poolIcon from '../../../assets/images/icons/houses-icons/pool.svg'
import cribIcon from '../../../assets/images/icons/houses-icons/crib.svg'
import courtyardIcon from '../../../assets/images/icons/houses-icons/courtyard.svg'
import dishwasherIcon from '../../../assets/images/icons/houses-icons/dishwasher.svg'
import washingIcon from '../../../assets/images/icons/houses-icons/washing.svg'
import diningIcon from '../../../assets/images/icons/houses-icons/dining.svg'
import parkingIcon from '../../../assets/images/icons/houses-icons/parking.svg'
import cleaningIcon from '../../../assets/images/icons/houses-icons/cleaning.svg'
import bedchangeIcon from '../../../assets/images/icons/houses-icons/bedchange.svg'
import kitchenIcon from '../../../assets/images/icons/houses-icons/kitchen.svg'
import ironIcon from '../../../assets/images/icons/houses-icons/iron.svg'
import grillIcon from '../../../assets/images/icons/houses-icons/grill.svg'
import refrigeratorIcon from '../../../assets/images/icons/houses-icons/refrigerator.svg'
import laundryIcon from '../../../assets/images/icons/houses-icons/laundry.svg'
import bedIcon from '../../../assets/images/icons/houses-icons/beddouble.svg'
import humanIcon from '../../../assets/images/icons/houses-icons/man.svg'
import tapIcon from '../../../assets/images/icons/houses-icons/capcap.svg'


export default function House() {
  const { houseId } = useParams()
  const [house, setHouse] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [housePictures, setHousePictures] = useState([])
  const [roomsPictures, setRoomsPictures] = useState([])


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

        const housePics = await getHouseImages(houseId)
        setHousePictures(housePics)
        const roomPics = await getRoomAllImages()
        setRoomsPictures(roomPics)
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
  }, []);

  house.services = [
    { name: 'Wi-Fi', icon: wifiIcon },
    { name: 'Фен', icon: hairdryerIcon },
    { name: 'Бассейн', icon: poolIcon },
    { name: 'Детская кроватка', icon: cribIcon },
    { name: 'Двор', icon: courtyardIcon },
    { name: 'Посудомоечная машина', icon: dishwasherIcon },
    { name: 'Стирка', icon: washingIcon },
    { name: 'Столовая', icon: diningIcon },
    { name: 'Парковка', icon: parkingIcon },
    { name: 'Уборка', icon: cleaningIcon },
    { name: 'Смена постели', icon: bedchangeIcon },
    { name: 'Кухня', icon: kitchenIcon },
    { name: 'Утюг', icon: ironIcon },
    { name: 'Гриль', icon: grillIcon },
    { name: 'Холодильник', icon: refrigeratorIcon },
    { name: 'Прачечная', icon: laundryIcon }
  ]

  const renderServices = (services) => {
    return services.map((service, index) => (
      <div key={index} className='house__services-item'>
        <img src={service.icon} alt={service.name} />
        <p>{service.name}</p>
      </div>
    ))
  }

  const handleRoomImage = (roomId) => {
    const pic = roomsPictures.find((pic) => pic.roomId === roomId)
    return pic ? `https://api.gelenrest.ru:3000${pic.url}` : altPicture
  }

  return (
    <section className='house'>
      <div className='container'>
        <ul className='breadcrumb'>
          <li className='breadcrumb__item'>
            <NavLink className="house__item-button--right" to='/'>Главная</NavLink>
          </li>
          <li className='breadcrumb__item'>
            <NavLink className="house__item-button--right" to='/houses'>Дома</NavLink>
          </li>
          <li className='breadcrumb__item'>
            {house.name}
          </li>
        </ul>
        <h2>{house.name}</h2>
        <p className="house__description-first">
          {house.description_1}
        </p>
        <HouseSlider housePictures={housePictures} />
        <a className='adress__link' href="#">{house.adress}</a>
        <h6 className="description__title">Описание</h6>
        <p className="house__description">
          {house.description_2}
        </p>
        <p className="house__description">
          {house.description_3}
        </p>
        <div className="house__info">
          <div className='house__info-item'>
            <p className='house__info-item--left'>Количество номеров:</p>
            <p className='house__info-item--right'>{house.roomCount}</p>
          </div>
          <div className='house__info-item'>
            <p className='house__info-item--left'>Категории номеров: </p>
            <p className='house__info-item--right'>{house.roomCategories}</p>
          </div>
          <div className='house__info-item'>
            <p className='house__info-item--left'>Условия бронирования:</p>
            <p className='house__info-item--right'>{house.bookingConditions}</p>
          </div>
          <div className='house__info-item'>
            <p className='house__info-item--left'>Расчетный час:</p>
            <p className='house__info-item--right'>{house.checkoutTime}</p>
          </div>
        </div>
        <div className="house__timeto">
          <h6 className="house__timeto-title">
            РАССТОЯНИЯ
          </h6>
          <div className="house__timeto-items">
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={seaIcon} alt="" />
                <p>Море</p>
              </div>
              <p className="house__timeto-item--right">
                {house.timeToSea}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={shopIcon} alt="" />
                <p>Рынок</p>
              </div>
              <p className="house__timeto-item--right">
                {house.timeToMarket}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={cafeIcon} alt="" />
                <p>Кафе</p>
              </div>
              <p className="house__timeto-item--right">
                {house.timeToCafe}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={busIcon} alt="" />
                <p>Автобусная остановка</p>
              </div>
              <p className="house__timeto-item--right">
                {house.timeToBusStop}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={mapIcon} alt="" />
                <p>Центр города</p>
              </div>
              <p className="house__timeto-item--right">
                {house.timeToBusCityCenter}
              </p>
            </div>
          </div>
        </div>
        <div className="house__services">
          <h5 className="house__services-title">
            УДОБСТВА И УСЛУГИ
          </h5>
          <div className="house__services-items">
            {house.services && renderServices(house.services)}
          </div>
        </div>
        <p className="house__description">
          {house.description_3}
        </p>
        <p className="house__description">
          {house.description_4}
        </p>
      </div>
      {/* изменить названия классов с apart на room */}
      <div className="apart__list">
        <ul className="apart__list-items">
          {rooms.map((room, index) => (
            <li key={index} className="apart__list-item">
              {Array.from({ length: room.roomCount }, (_, index) => (
                <img key={index} src={humanIcon} alt={room.name} />
              ))
              }
              <a href="#">{room.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="apart">
        <h2 className="apart__items-title">
          НОМЕРА
        </h2>
        <div className="apart__items">
          {rooms.map(room => (
            <div key={room.id} className="apart__item">
              <div className="apart__item-content">
                <h6>{room.name}</h6>
                <img className="apart__item-img" src={handleRoomImage(room.id)} alt={room.name} />
                <div className="apart__item-icons">
                  <div className="apart__item-icon">
                    <img src={bedIcon} alt="" />
                    {room.roomCount < 2 ? (
                      <p>{`${room.roomCount} спальное место`}</p>
                    ) : (
                      <p>{`${room.roomCount} спальных места`}</p>
                    )}
                  </div>
                  <div className="apart__item-icon">
                    <img src={wifiIcon} alt="" />
                    <p>Интернет</p>
                  </div>
                  <div className="apart__item-icon">
                    <img src={refrigeratorIcon} alt="" />
                    <p>Холодильник</p>
                  </div>
                  <div className="apart__item-icon">
                    <img src={tapIcon} alt="" />
                    <p>Санузел</p>
                  </div>
                </div>
                {Array.from({ length: room.roomCount }, (_, index) => (
                  <div key={index} className="apart__item-man"><img src={humanIcon} alt="" /></div>
                ))}
                <div className="apart__item-buttons">
                  <NavLink to={`/houses/${houseId}/rooms/${room.id}`} className='apart__item-btn--left' >Подробнее</NavLink>
                  <a className='apart__item-btn--right' href="#">Забронировать</a>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </section>
    // <div className="hous">
    //   <div className="container">
    //     <ul className="breadcrumb">
    //       <li className='breadcrumb__item'>
    //         <a href="#">
    //           Главная
    //         </a>
    //       </li>
    //       <li className='breadcrumb__item'>
    //         <a href="#">Дома</a>
    //       </li>
    //       <li className='breadcrumb__item'>
    //         Дом с бассейнами
    //       </li>
    //     </ul>
    //     <h2>{house[0].name}</h2>
    //     <p className="house__description-first">
    //       {house[0].description[0]}
    //     </p>
    //     <HouseSlider />
    //     <a className='adress__link' href="#">{house[0].adress}</a>
    //     <h6 className="description__title">Описание</h6>
    //     <p className="house__description">
    //       {house[0].description[1]}
    //     </p>
    //     <p className="house__description">
    //       {house[0].description[2]}
    //     </p>
    //     <div className="house__info">
    //       <div className='house__info-item'>
    //         <p className='house__info-item--left'>Количество номеров:</p>
    //         <p className='house__info-item--right'>{house[0].roomCount}</p>
    //       </div>
    //       <div className='house__info-item'>
    //         <p className='house__info-item--left'>Категории номеров: </p>
    //         <p className='house__info-item--right'>{house[0].roomCategories}</p>
    //       </div>
    //       <div className='house__info-item'>
    //         <p className='house__info-item--left'>Условия бронирования:</p>
    //         <p className='house__info-item--right'>{house[0].bookingConditions}</p>
    //       </div>
    //       <div className='house__info-item'>
    //         <p className='house__info-item--left'>Расчетный час:</p>
    //         <p className='house__info-item--right'>{house[0].checkoutTime}</p>
    //       </div>
    //     </div>
    //     <div className="house__timeto">
    //       <h6 className="house__timeto-title">
    //         РАССТОЯНИЯ
    //       </h6>
    //       <div className="house__timeto-items">
    //         <div className="house__timeto-item">
    //           <div className="house__timeto-item--left">
    //             <img src={house[0].timeTo.icons[0]} alt="" />
    //             <p>Море</p>
    //           </div>
    //           <p className="house__timeto-item--right">
    //             {house[0].timeTo.sea}
    //           </p>
    //         </div>

    //         <div className="house__timeto-item">
    //           <div className="house__timeto-item--left">
    //             <img src={house[0].timeTo.icons[1]} alt="" />
    //             <p>Рынок</p>
    //           </div>
    //           <p className="house__timeto-item--right">
    //             {house[0].timeTo.market}
    //           </p>
    //         </div>
    //         <div className="house__timeto-item">
    //           <div className="house__timeto-item--left">
    //             <img src={house[0].timeTo.icons[2]} alt="" />
    //             <p>Кафе</p>
    //           </div>
    //           <p className="house__timeto-item--right">
    //             {house[0].timeTo.cafe}
    //           </p>
    //         </div>
    //         <div className="house__timeto-item">
    //           <div className="house__timeto-item--left">
    //             <img src={house[0].timeTo.icons[3]} alt="" />
    //             <p>Автобусная остановка</p>
    //           </div>
    //           <p className="house__timeto-item--right">
    //             {house[0].timeTo.busStop}
    //           </p>
    //         </div>
    //         <div className="house__timeto-item">
    //           <div className="house__timeto-item--left">
    //             <img src={house[0].timeTo.icons[4]} alt="" />
    //             <p>Центр города</p>
    //           </div>
    //           <p className="house__timeto-item--right">
    //             {house[0].timeTo.cityCenter}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="house__services">
    //       <h5 className="house__services-title">
    //         УДОБСТВА И УСЛУГИ
    //       </h5>
    //       <div className="house__services-items">
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[0]} alt="" />
    //           <p>{house[0].services.names[0]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[1]} alt="" />
    //           <p>{house[0].services.names[1]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[2]} alt="" />
    //           <p>{house[0].services.names[2]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[3]} alt="" />
    //           <p>{house[0].services.names[3]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[4]} alt="" />
    //           <p>{house[0].services.names[4]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[5]} alt="" />
    //           <p>{house[0].services.names[5]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[6]} alt="" />
    //           <p>{house[0].services.names[6]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[7]} alt="" />
    //           <p>{house[0].services.names[7]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[8]} alt="" />
    //           <p>{house[0].services.names[8]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[9]} alt="" />
    //           <p>{house[0].services.names[9]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[10]} alt="" />
    //           <p>{house[0].services.names[10]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[11]} alt="" />
    //           <p>{house[0].services.names[11]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[12]} alt="" />
    //           <p>{house[0].services.names[12]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[13]} alt="" />
    //           <p>{house[0].services.names[13]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[14]} alt="" />
    //           <p>{house[0].services.names[14]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[15]} alt="" />
    //           <p>{house[0].services.names[15]}</p>
    //         </div>
    //         <div className="house__services-item">
    //           <img src={house[0].services.icons[16]} alt="" />
    //           <p>{house[0].services.names[16]}</p>
    //         </div>
    //       </div>
    //     </div>
    //     <p className="house__description">
    //       {house[0].description[2]}
    //     </p>
    //     <p className="house__description">
    //       {house[0].description[3]}
    //     </p>
    //     <p className="house__description">
    //       {house[0].description[4]}
    //     </p>
    //     <div className="apart__list">
    //       <ul className="apart__list-items">
    //         <li className="apart__list-item">
    //           {/* {for(let i = 0; i < aparts[0].places; i++){
    //              <img src="''src../public/assets/images/icons/houses-icons/man.svg" alt="" />
    //          размножить человечков
    //          }} */}
    //           <img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" />
    //           <a href="#">{aparts[0].name}</a>
    //         </li>
    //         <li className="apart__list-item">
    //           <img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" />
    //           <a href="#">{aparts[1].name}</a>
    //         </li>
    //         <li className="apart__list-item">
    //           <img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" />
    //           <a href="#">{aparts[2].name}</a>
    //         </li>
    //         <li className="apart__list-item">
    //           <img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" />
    //           <a href="#">{aparts[3].name}</a>
    //         </li>
    //         <li className="apart__list-item">
    //           <img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" />
    //           <a href="#">{aparts[4].name}</a>
    //         </li>
    //         <li className="apart__list-item">
    //           <img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" />
    //           <a href="#">{aparts[5].name}</a>
    //         </li>
    //         <li className="apart__list-item">
    //           <img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" />
    //           <a href="#">{aparts[6].name}</a>
    //         </li>
    //         <li className="apart__list-item">
    //           <img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" />
    //           <a href="#">{aparts[7].name}</a>
    //         </li>
    //         <li className="apart__list-item">
    //           <img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" />
    //           <a href="#">{aparts[8].name}</a>
    //         </li>
    //         <li className="apart__list-item">
    //           <img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" />
    //           <a href="#">{aparts[9].name}</a>
    //         </li>
    //       </ul>
    //     </div>

    //     <div className="apart">
    //       <h5 className="apart__items-title">
    //         НОМЕРА
    //       </h5>
    //       <div className="apart__items">
    //         <div className="apart__item">
    //           <div className="apart__item-content">
    //             <h6 href="#">{aparts[0].name}</h6>
    //             <img className='apart__item-img' src={aparts[0].photo} alt="" />
    //             <div className="apart__item-icons">
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[0]} alt="" />
    //                 <p>{aparts[0].facilities.services[0]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[1]} alt="" />
    //                 <p>{aparts[0].facilities.services[1]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[2]} alt="" />
    //                 <p>{aparts[0].facilities.services[2]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[3]} alt="" />
    //                 <p>{aparts[0].facilities.services[3]}</p>
    //               </div>
    //             </div>
    //             <div className="apart__item-man"><img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" /></div>
    //             <div className="apart__item-buttons">
    //               <a className='apart__item-btn--left' href="#">Подробнее</a>
    //               <a className='apart__item-btn--right' href="#">Забронировать</a>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="apart__item">
    //           <div className="apart__item-content">
    //             <h6 href="#">{aparts[1].name}</h6>
    //             <img className='apart__item-img' src={aparts[1].photo} alt="" />
    //             <div className="apart__item-icons">
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[0]} alt="" />
    //                 <p>{aparts[0].facilities.services[0]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[1]} alt="" />
    //                 <p>{aparts[0].facilities.services[1]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[2]} alt="" />
    //                 <p>{aparts[0].facilities.services[2]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[3]} alt="" />
    //                 <p>{aparts[0].facilities.services[3]}</p>
    //               </div>
    //             </div>
    //             <div className="apart__item-man"><img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" /></div>
    //             <div className="apart__item-buttons">
    //               <a className='apart__item-btn--left' href="#">Подробнее</a>
    //               <a className='apart__item-btn--right' href="#">Забронировать</a>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="apart__item">
    //           <div className="apart__item-content">
    //             <h6 href="#">{aparts[2].name}</h6>
    //             <img className='apart__item-img' src={aparts[2].photo} alt="" />
    //             <div className="apart__item-icons">
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[0]} alt="" />
    //                 <p>{aparts[0].facilities.services[0]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[1]} alt="" />
    //                 <p>{aparts[0].facilities.services[1]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[2]} alt="" />
    //                 <p>{aparts[0].facilities.services[2]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[3]} alt="" />
    //                 <p>{aparts[0].facilities.services[3]}</p>
    //               </div>
    //             </div>
    //             <div className="apart__item-man"><img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" /></div>
    //             <div className="apart__item-buttons">
    //               <a className='apart__item-btn--left' href="#">Подробнее</a>
    //               <a className='apart__item-btn--right' href="#">Забронировать</a>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="apart__item">
    //           <div className="apart__item-content">
    //             <h6 href="#">{aparts[3].name}</h6>
    //             <img className='apart__item-img' src={aparts[3].photo} alt="" />
    //             <div className="apart__item-icons">
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[0]} alt="" />
    //                 <p>{aparts[0].facilities.services[0]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[1]} alt="" />
    //                 <p>{aparts[0].facilities.services[1]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[2]} alt="" />
    //                 <p>{aparts[0].facilities.services[2]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[3]} alt="" />
    //                 <p>{aparts[0].facilities.services[3]}</p>
    //               </div>
    //             </div>
    //             <div className="apart__item-man"><img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" /></div>
    //             <div className="apart__item-buttons">
    //               <a className='apart__item-btn--left' href="#">Подробнее</a>
    //               <a className='apart__item-btn--right' href="#">Забронировать</a>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="apart__item">
    //           <div className="apart__item-content">
    //             <h6 href="#">{aparts[4].name}</h6>
    //             <img className='apart__item-img' src={aparts[4].photo} alt="" />
    //             <div className="apart__item-icons">
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[0]} alt="" />
    //                 <p>{aparts[0].facilities.services[0]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[1]} alt="" />
    //                 <p>{aparts[0].facilities.services[1]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[2]} alt="" />
    //                 <p>{aparts[0].facilities.services[2]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[3]} alt="" />
    //                 <p>{aparts[0].facilities.services[3]}</p>
    //               </div>
    //             </div>
    //             <div className="apart__item-man"><img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" /></div>
    //             <div className="apart__item-buttons">
    //               <a className='apart__item-btn--left' href="#">Подробнее</a>
    //               <a className='apart__item-btn--right' href="#">Забронировать</a>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="apart__item">
    //           <div className="apart__item-content">
    //             <h6 href="#">{aparts[5].name}</h6>
    //             <img className='apart__item-img' src={aparts[5].photo} alt="" />
    //             <div className="apart__item-icons">
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[0]} alt="" />
    //                 <p>{aparts[0].facilities.services[0]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[1]} alt="" />
    //                 <p>{aparts[0].facilities.services[1]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[2]} alt="" />
    //                 <p>{aparts[0].facilities.services[2]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[3]} alt="" />
    //                 <p>{aparts[0].facilities.services[3]}</p>
    //               </div>
    //             </div>
    //             <div className="apart__item-man"><img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" /></div>
    //             <div className="apart__item-buttons">
    //               <a className='apart__item-btn--left' href="#">Подробнее</a>
    //               <a className='apart__item-btn--right' href="#">Забронировать</a>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="apart__item">
    //           <div className="apart__item-content">
    //             <h6 href="#">{aparts[6].name}</h6>
    //             <img className='apart__item-img' src={aparts[6].photo} alt="" />
    //             <div className="apart__item-icons">
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[0]} alt="" />
    //                 <p>{aparts[0].facilities.services[0]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[1]} alt="" />
    //                 <p>{aparts[0].facilities.services[1]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[2]} alt="" />
    //                 <p>{aparts[0].facilities.services[2]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[3]} alt="" />
    //                 <p>{aparts[0].facilities.services[3]}</p>
    //               </div>
    //             </div>
    //             <div className="apart__item-man"><img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" /></div>
    //             <div className="apart__item-buttons">
    //               <a className='apart__item-btn--left' href="#">Подробнее</a>
    //               <a className='apart__item-btn--right' href="#">Забронировать</a>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="apart__item">
    //           <div className="apart__item-content">
    //             <h6 href="#">{aparts[7].name}</h6>
    //             <img className='apart__item-img' src={aparts[7].photo} alt="" />
    //             <div className="apart__item-icons">
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[0]} alt="" />
    //                 <p>{aparts[0].facilities.services[0]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[1]} alt="" />
    //                 <p>{aparts[0].facilities.services[1]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[2]} alt="" />
    //                 <p>{aparts[0].facilities.services[2]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[3]} alt="" />
    //                 <p>{aparts[0].facilities.services[3]}</p>
    //               </div>
    //             </div>
    //             <div className="apart__item-man"><img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" /></div>
    //             <div className="apart__item-buttons">
    //               <a className='apart__item-btn--left' href="#">Подробнее</a>
    //               <a className='apart__item-btn--right' href="#">Забронировать</a>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="apart__item">
    //           <div className="apart__item-content">
    //             <h6 href="#">{aparts[8].name}</h6>
    //             <img className='apart__item-img' src={aparts[8].photo} alt="" />
    //             <div className="apart__item-icons">
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[0]} alt="" />
    //                 <p>{aparts[0].facilities.services[0]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[1]} alt="" />
    //                 <p>{aparts[0].facilities.services[1]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[2]} alt="" />
    //                 <p>{aparts[0].facilities.services[2]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[3]} alt="" />
    //                 <p>{aparts[0].facilities.services[3]}</p>
    //               </div>
    //             </div>
    //             <div className="apart__item-man"><img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" /></div>
    //             <div className="apart__item-buttons">
    //               <a className='apart__item-btn--left' href="#">Подробнее</a>
    //               <a className='apart__item-btn--right' href="#">Забронировать</a>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="apart__item">
    //           <div className="apart__item-content">
    //             <h6 href="#">{aparts[9].name}</h6>
    //             <img className='apart__item-img' src={aparts[9].photo} alt="" />
    //             <div className="apart__item-icons">
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[0]} alt="" />
    //                 <p>{aparts[0].facilities.services[0]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[1]} alt="" />
    //                 <p>{aparts[0].facilities.services[1]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[2]} alt="" />
    //                 <p>{aparts[0].facilities.services[2]}</p>
    //               </div>
    //               <div className="apart__item-icon">
    //                 <img src={aparts[0].facilities.icons[3]} alt="" />
    //                 <p>{aparts[0].facilities.services[3]}</p>
    //               </div>
    //             </div>
    //             <div className="apart__item-man"><img src="../../../../public/assets/images/icons/houses-icons/man.svg" alt="" /></div>
    //             <div className="apart__item-buttons">
    //               <a className='apart__item-btn--left' href="#">Подробнее</a>
    //               <a className='apart__item-btn--right' href="#">Забронировать</a>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
