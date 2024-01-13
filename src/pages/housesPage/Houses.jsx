import React, { useEffect, useRef, useMemo } from 'react';
import { NavLink } from "react-router-dom";
import '../../assets/styles/pagesStyles/houses.css';

import altPicture from '../../assets/images/homeCards/home-1.png'
import seaIcon from '../../assets/images/icons/sea.svg';
import shopIcon from '../../assets/images/icons/shop.svg';
import cafeIcon from '../../assets/images/icons/cafe.svg';
import busIcon from '../../assets/images/icons/bus.svg';
import mapIcon from '../../assets/images/icons/map.svg';

import { useData } from '../../components/DataProvider';


export default function Houses() {

  const { isLoading, error, houses, housePictures, fetchDataHouses } = useData();

  const prevHousesRef = useRef();
  const prevHousePicturesRef = useRef();

  useEffect(() => {
    if (prevHousesRef.current !== houses.length || prevHousePicturesRef.current !== housePictures.length) {
      fetchDataHouses();
    }
    prevHousesRef.current = houses.length;
    prevHousePicturesRef.current = housePictures.length;
  }, [houses.length, housePictures.length]);

  const handleHouseImage = useMemo(() => (houseId) => {
    const picture = housePictures.find(pic => pic.houseId === houseId);
    return picture ? `https://api.gelenrest.ru${picture.url}` : altPicture;
  }, [housePictures]);

  function renderTimeToItem(label, time, iconSrc) {
    return (
      <div className="time__item">
        <div className="time__item-left">
          <img src={iconSrc} alt={label} />
          <p>{label}</p>
        </div>
        <p className="time__item-right">{time}</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return (
    <section className="houses">
      <div className="container">
        <ul className="breadcrumb">
          <li className='breadcrumb__item'>
            <NavLink to={`/`}>
              Главная
            </NavLink>
          </li>
          <li className='breadcrumb__item'>
            Дома
          </li>
        </ul>
        <div className="houses__items">
          {houses.map((house) => (
            <div key={house.id} className="house__item">
              <h5 className="house__item-title house__item-title--min">
                {house.name}
              </h5>
              <div className="house__item__left">
                <img className='house__item-img' src={handleHouseImage(house.id)} alt={house.name} />
                <div className="house__item-buttons">
                  <NavLink className="house__item-button--left" to={`/reservation`}>Забронировать</NavLink>
                  <NavLink className="house__item-button--right" to={`/houses/${house.id}`}>Смотреть номера</NavLink>
                </div>
              </div>
              <div className="house__item-right">
                <h5 className="house__item-title house__item-title--max">
                  {house.name}
                </h5>
                <div className="house__item-prop">
                  <div className="prop__item">
                    <p className="prop__item-left">Количество номеров</p>
                    <p className="prop__item-right">{house.roomCount}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Категории номеров</p>
                    <p className="prop__item-right">{house.roomCategories}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Питание</p>
                    <p className="prop__item-right">{house.meal}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Условия бронирования</p>
                    <p className="prop__item-right">{house.bookingConditions}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Расчетный час</p>
                    <p className="prop__item-right">{house.checkoutTime}</p>
                  </div>
                </div>
                <div className="house__item-time">
                  {renderTimeToItem("Море", house.timeToSea, seaIcon)}
                  {renderTimeToItem("Рынок", house.timeToMarket, shopIcon)}
                  {renderTimeToItem("Кафе", house.timeToCafe, cafeIcon)}
                  {renderTimeToItem("Автобусная остановка", house.timeToBusStop, busIcon)}
                  {renderTimeToItem("Центр города", house.timeToBusCityCenter, mapIcon)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
