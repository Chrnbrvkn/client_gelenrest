import React, { useEffect, useState } from 'react';
import { getHouseImages, getHouse } from '../../../api/housesApi';
import { getRoomAllImages, getRoomOneImage, getRooms } from '../../../api/roomsApi';
import altPicture from '/src/assets/images/homeCards/home-1.png'
import { NavLink, Link } from "react-router-dom";
import '../../../assets/styles/pagesStyles/house.css'
import HouseSlider from './HouseSlider';
import { useParams } from 'react-router-dom';

import { useApiData } from '../../../contexts/ApiProvider';
import { useData } from '../../../contexts/DataProvider';
import { icons, roomIcons } from '../../../constants/iconsPath';
import humanIcon from '../../../assets/images/icons/houses-icons/man.svg'
import useScrollTop from '../../../hooks/useScrollTop';

export default function House() {
  useScrollTop()
  const { isLoading } = useData();
  const { houses, housesPictures, rooms, roomsPictures } = useApiData();
  const { houseId } = useParams();
  const [house, setHouse] = useState(null);
  const [houseRooms, setHouseRooms] = useState([]);

  const renderIcons = (house) => {
    const excludeKeys = ['timeToSea', 'timeToMarket', 'timeToCafe', 'timeToBusStop', 'timeToBusCityCenter'];
    return Object.keys(icons).map((key) => {
      if (!excludeKeys.includes(key) && house[key]) {
        return (
          <div key={key} className="house__service-item">
            <img src={icons[key].icon} alt={icons[key].name} />
            <p>{icons[key].name}</p>
          </div>
        );
      }
      return null;
    }).filter(icon => icon !== null);
  };

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

  if (isLoading || !house) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className='house house__official'>
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
                <img src={icons.timeToSea.icon} alt="" />
                <p>Море</p>
              </div>
              <p className="house__timeto-item--right">
                {house.timeToSea}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={icons.timeToMarket.icon} alt="" />
                <p>Рынок</p>
              </div>
              <p className="house__timeto-item--right">
                {house.timeToMarket}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={icons.timeToCafe.icon} alt="" />
                <p>Кафе</p>
              </div>
              <p className="house__timeto-item--right">
                {house.timeToCafe}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={icons.timeToBusStop.icon} alt="" />
                <p>Автобусная остановка</p>
              </div>
              <p className="house__timeto-item--right">
                {house.timeToBusStop}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={icons.timeToBusCityCenter.icon} alt="" />
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
      <div className="apart__list">
        <div className="container">
          <ul className="apart__list-items">
            {houseRooms.map((room) => (
              <li key={room.id} className="apart__list-item">
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
              <div key={room.id} className="apart__item">
                <div className="apart__item-content">
                  <h6>{room.name}</h6>
                  <img className="apart__item-img" src={handleRoomImage(room.id)} alt={room.name} />
                  <div className="apart__item-icons">
                    <div className="apart__item-icon">
                      <img src={roomIcons.bedroom} alt="" />
                      {room.roomCount < 2 ? (
                        <p>{`${room.roomCount} спальное место`}</p>
                      ) : (
                        <p>{`${room.roomCount} спальных места`}</p>
                      )}
                    </div>
                    <div className="apart__item-icon">
                      <img src={icons.internet} alt="" />
                      <p>Интернет</p>
                    </div>
                    <div className="apart__item-icon">
                      <img src={icons.refrigerator} alt="" />
                      <p>Холодильник</p>
                    </div>
                    <div className="apart__item-icon">
                      <img src={roomIcons.bathroom} alt="" />
                      <p>Санузел</p>
                    </div>
                  </div>
                  <div className="apart__item-man--items">
                    {Array.from({ length: room.roomCount }, (_, index) => (
                      <div key={index} className="apart__item-man"><img src={humanIcon} alt="" /></div>
                    ))}
                  </div>
                  <div className="apart__item-buttons">
                    <NavLink to={`/houses/${houseId}/rooms/${room.id}`} className='apart__item-btn--left' >Подробнее</NavLink>
                    <a className='apart__item-btn--right' href="#">Забронировать</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}
