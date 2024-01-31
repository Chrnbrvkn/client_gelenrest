import React, { useEffect, useState } from 'react';
import { getHouseImages, getHouse } from '../../../api/housesApi';
import { getRoomAllImages, getRoomOneImage, getRooms } from '../../../api/roomsApi';
import altPicture from '/src/assets/images/homeCards/home-1.png'
import { NavLink, Link } from "react-router-dom";
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
import { icons } from '../../../constants/iconsPath';
import { useApiData } from '../../../contexts/ApiProvider';
import { useData } from '../../../contexts/DataProvider';


export default function House() {
  const { isLoading } = useData();
  const { houses, housesPictures, rooms, roomsPictures } = useApiData();
  const { houseId } = useParams();
  const [house, setHouse] = useState(null);
  const [houseRooms, setHouseRooms] = useState([]);

  useEffect(() => {
    const foundHouse = houses.find(el => el.id === parseInt(houseId, 10));
    setHouse(foundHouse);
    const relatedRooms = rooms.filter(room => room.houseId === parseInt(houseId, 10));
    setHouseRooms(relatedRooms);
  }, [houseId, houses, rooms]);

  const handleRoomImage = (roomId) => {
    const picture = roomsPictures.find(pic => pic.roomId === roomId);
    return picture ? `https://api.gelenrest.ru${picture.url}` : altPicture;
  };

  // Фильтрация списка картинок дома по id выбранного дома
  const filteredHousePictures = housesPictures.filter(picture => picture.houseId === parseInt(houseId, 10));


  const renderIcons = (house) => {
    const excludeKeys = [
      'timeToSea',
      'timeToMarket',
      'timeToCafe',
      'timeToBusStop',
      'timeToBusCityCenter'
    ];
    return Object.keys(icons).map((key) => {
      if (!excludeKeys.includes(key) && house[key]) {
        return (
          <div key={key} className="house__service-item">
            <img src={icons[key]} alt={key} />
            <p>{key.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>
        );
      }
      return null;
    }).filter(icon => icon !== null);
  };

  if (isLoading || !house) {
    return <div>Загрузка...</div>;
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
        <HouseSlider housePictures={filteredHousePictures} />
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
            {house && renderIcons(house)}
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
        <div className="container">
          <ul className="apart__list-items">
            {houseRooms.map((room, index) => (
              <li key={index} className="apart__list-item">
                <div className="apart__list-item-img">
                  {Array.from({ length: room.roomCount }, (_, index) => (
                    <img key={index} src={humanIcon} alt={room.name} />
                  ))
                  }
                </div>
                <NavLink to={`/houses/${houseId}/rooms/${room.id}`}>{room.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="apart">
        <h2 className="apart__items-title">
          НОМЕРА
        </h2>
        <div className="container">
          <div className="apart__items">
            {houseRooms.map(room => (
              <div key={room.id} className="room__item">
                <h3 className="room__title">{room.name}</h3>
                <img className="room__img" src={handleRoomImage(room.id)} alt={room.name} />
                {/* Отображение других свойств комнаты */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}
