import React, { useEffect, useState } from 'react';
import { useApiData } from '../../contexts/ApiProvider';
import { useData } from '../../contexts/DataProvider';
import { icons } from '../../constants/iconsPath'
import altPicture from '/src/assets/images/homeCards/home-1.png'
import { NavLink, Link } from "react-router-dom";
import '../../assets/styles/pagesStyles/house.css'
import ApartSlider from './ApartSlider';
import { useParams } from 'react-router-dom';

import seaIcon from '../../assets/images/icons/sea.svg'
import shopIcon from '../../assets/images/icons/shop.svg'
import cafeIcon from '../../assets/images/icons/cafe.svg'
import busIcon from '../../assets/images/icons/bus.svg'
import mapIcon from '../../assets/images/icons/map.svg'
import wifiIcon from '../../assets/images/icons/houses-icons/wifi.svg'
import hairdryerIcon from '../../assets/images/icons/houses-icons/hairdryer.svg'
import poolIcon from '../../assets/images/icons/houses-icons/pool.svg'
import cribIcon from '../../assets/images/icons/houses-icons/crib.svg'
import courtyardIcon from '../../assets/images/icons/houses-icons/courtyard.svg'
import dishwasherIcon from '../../assets/images/icons/houses-icons/dishwasher.svg'
import washingIcon from '../../assets/images/icons/houses-icons/washing.svg'
import diningIcon from '../../assets/images/icons/houses-icons/dining.svg'
import parkingIcon from '../../assets/images/icons/houses-icons/parking.svg'
import cleaningIcon from '../../assets/images/icons/houses-icons/cleaning.svg'
import bedchangeIcon from '../../assets/images/icons/houses-icons/bedchange.svg'
import kitchenIcon from '../../assets/images/icons/houses-icons/kitchen.svg'
import ironIcon from '../../assets/images/icons/houses-icons/iron.svg'
import grillIcon from '../../assets/images/icons/houses-icons/grill.svg'
import refrigeratorIcon from '../../assets/images/icons/houses-icons/refrigerator.svg'
import laundryIcon from '../../assets/images/icons/houses-icons/laundry.svg'
import bedIcon from '../../assets/images/icons/houses-icons/beddouble.svg'
import humanIcon from '../../assets/images/icons/houses-icons/man.svg'
import tapIcon from '../../assets/images/icons/houses-icons/capcap.svg'



export default function Apartament() {
  const { isLoading } = useData();
  const { aparts, apartsPictures } = useApiData();
  const { apartId } = useParams();
  const [apart, setApart] = useState(null);

  useEffect(() => {
    const foundApart = aparts.find(el => el.id === parseInt(apartId, 10));
    setApart(foundApart);
  }, [apartId, aparts]);

  const renderIcons = (apart) => {
    const excludeKeys = [
      'timeToSea',
      'timeToMarket',
      'timeToCafe',
      'timeToBusStop',
      'timeToBusCityCenter'
    ];

    return Object.keys(icons).map((key) => {
      if (!excludeKeys.includes(key) && apart[key]) { // Проверяем, что ключ не в списке исключений и значение true
        return (
          <div key={key} className="house__service-item">
            <img src={icons[key]} alt={key} />
            <p>{key.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>
        );
      }
      return null;
    }).filter(icon => icon !== null); // Удаление null значений из массива
  };

  if (isLoading || !apart) {
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
            <NavLink className="house__item-button--right" to='/apartments'>Квартиры</NavLink>
          </li>
          <li className='breadcrumb__item'>
            {apart.name}
          </li>
        </ul>
        <h2>{apart.name}</h2>
        <p className="house__description-first">
          {apart.description_1}
        </p>
        <ApartSlider apartPictures={apartsPictures} />
        <a className='adress__link' href="#">{apart.adress}</a>
        <h6 className="description__title">Описание</h6>
        <p className="house__description">
          {apart.description_2}
        </p>
        <p className="house__description">
          {apart.description_3}
        </p>
        <div className="house__info">
          <div className='house__info-item'>
            <p className='house__info-item--left'>Количество номеров:</p>
            <p className='house__info-item--right'>{apart.roomCount}</p>
          </div>
          <div className='house__info-item'>
            <p className='house__info-item--left'>Категория квартиры: </p>
            <p className='house__info-item--right'>{apart.roomCategories}</p>
          </div>
          <div className='house__info-item'>
            <p className='house__info-item--left'>Условия бронирования:</p>
            <p className='house__info-item--right'>{apart.bookingConditions}</p>
          </div>
          <div className='house__info-item'>
            <p className='house__info-item--left'>Расчетный час:</p>
            <p className='house__info-item--right'>{apart.checkoutTime}</p>
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
                {apart.timeToSea}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={shopIcon} alt="" />
                <p>Рынок</p>
              </div>
              <p className="house__timeto-item--right">
                {apart.timeToMarket}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={cafeIcon} alt="" />
                <p>Кафе</p>
              </div>
              <p className="house__timeto-item--right">
                {apart.timeToCafe}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={busIcon} alt="" />
                <p>Автобусная остановка</p>
              </div>
              <p className="house__timeto-item--right">
                {apart.timeToBusStop}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={mapIcon} alt="" />
                <p>Центр города</p>
              </div>
              <p className="house__timeto-item--right">
                {apart.timeToBusCityCenter}
              </p>
            </div>
          </div>
        </div>
        <div className="house__services">
          <h5 className="house__services-title">
            УДОБСТВА И УСЛУГИ
          </h5>
          <div className="house__services-items">
            {renderIcons(apart)}
          </div>
        </div>
        <p className="house__description">
          {apart.description_3}
        </p>
        <p className="house__description">
          {apart.description_4}
        </p>
      </div>
      <Link to={`/reservation/apartment/${apart.id}`} className="apart__item-btn--right apart__item-btn--update">Забронировать</Link>
      <div className="apart__list">
        <div className="container">
          <ul className="apart__list-items">
            {aparts.map((apart, index) => (
              <li key={index} className="apart__list-item">
                {Array.from({ length: apart.roomCount }, (_, index) => (
                  <img key={index} src={humanIcon} alt={apart.name} />
                ))
                }
                <NavLink to={`/apartments/${apart.id}`}>{apart.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
