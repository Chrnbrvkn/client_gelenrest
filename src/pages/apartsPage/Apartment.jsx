import React, { useEffect, useMemo, useState } from 'react';
import { useApiData } from '../../contexts/ApiProvider';
import { useData } from '../../contexts/DataProvider';
import { icons } from '../../constants/iconsPath'
// import altPicture from '/src/assets/images/homeCards/home-1.png'
import { NavLink, Link } from "react-router-dom";
import '../../assets/styles/pagesStyles/house.css'
import ApartSlider from './ApartSlider';
import { useParams } from 'react-router-dom';

// import humanIcon from '../../assets/images/icons/houses-icons/man.svg'

import useScrollTop from '../../hooks/useScrollTop';
import { useModals } from '../../contexts/ModalsProvider';

import altPicture from '/src/assets/images/homeCards/home-1.png'

import { useDispatch, useSelector } from 'react-redux'

import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchApartsAsync } from '../../store/features/lists/aparts/apartsFetch';


export default function Apartament() {
  useScrollTop()

  const { openBookingModal, isOpen, setIsOpen } = useModals()

  const { apartId } = useParams();

  const aparts = useSelector(state => state.aparts.data)

  const apart = aparts.find(a => a.id === parseInt(apartId, 10));

  const isLoading = useSelector(state => state.loading.isLoading);

  const dispatch = useDispatch()

  useEffect(_ => {
    dispatch(fetchApartsAsync())
  }, [dispatch])


  const handleReserveClick = (apart) => {
    openBookingModal(apart)
  }

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


  if (isLoading || !apart) {
    return <LoadingSpinner />;
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
        {apart.images.length > 0
          ?
          <ApartSlider apartPictures={apart.images} />
          :
          <img src={altPicture} alt={apart.name} />
        }
        <a className='adress__link'>{apart.address}</a>
        <h6 className="description__title">Описание</h6>
        <p className="house__description">
          {apart.description_2}
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
                <img src={icons.timeToSea.icon} alt="" />
                <p>Море</p>
              </div>
              <p className="house__timeto-item--right">
                {apart.timeToSea}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={icons.timeToMarket.icon} alt="" />
                <p>Рынок</p>
              </div>
              <p className="house__timeto-item--right">
                {apart.timeToMarket}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={icons.timeToCafe.icon} alt="" />
                <p>Кафе</p>
              </div>
              <p className="house__timeto-item--right">
                {apart.timeToCafe}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={icons.timeToBusStop.icon} alt="" />
                <p>Автобусная остановка</p>
              </div>
              <p className="house__timeto-item--right">
                {apart.timeToBusStop}
              </p>
            </div>
            <div className="house__timeto-item">
              <div className="house__timeto-item--left">
                <img src={icons.timeToBusCityCenter.icon} alt="" />
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
      <button onClick={() => openBookingModal(apart)} className="apart__item-btn--right apart__item-btn--update">Забронировать</button>
      <div className="apart__list">
        <div className="container">
          {aparts.filter(apart => apart.id !== +apartId).map(apart => (
            <div key={apart.id} className="house__item">
              <h5 className="house__item-title house__item-title--min">
                {apart.name}
              </h5>
              <div className="house__item__left">
                <img src={`https://api.gelenrest.ru${apart.images[0].url}`}
                  alt={apart.name}
                  className="house__item-img"
                />
                <div className="house__item-buttons">
                  <NavLink onClick={() => handleScroll()} to={`/apartments/${apart.id}`} className="house__item-button-right">Смотреть квартиру</NavLink>
                </div>
              </div>
              <div className="house__item-right">
                <h5 className="house__item-title house__item-title--max">{apart.name}</h5>
                <div className="house__item-prop">
                  <div className="prop__item">
                    <p className="prop__item-left">Количество спальных мест</p>
                    <p className="prop__item-left">{apart.roomCount}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Категория квартиры</p>
                    <p className="prop__item-left">{apart.roomCategories}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Кухня</p>
                    <p className="prop__item-left">{apart.meal}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Условия бронирования</p>
                    <p className="prop__item-left">{apart.bookingConditions}</p>
                  </div>
                  <div className="prop__item">
                    <p className="prop__item-left">Расчетный час</p>
                    <p className="prop__item-right">{apart.checkoutTime}</p>
                  </div>
                </div>
                <div className="house__item-time">
                  <div className="time__item">
                    <div className="time__item-left">
                      <img src={icons.timeToSea.icon} alt={'Время до моря'} />
                      <p>Море</p>
                    </div>
                    <p className="time__item-right">{apart.timeToSea}</p>
                  </div>
                  <div className="time__item">
                    <div className="time__item-left">
                      <img src={icons.timeToMarket.icon} alt={'Время до магазина'} />
                      <p>Магазин</p>
                    </div>
                    <p className="time__item-right">{apart.timeToMarket}</p>
                  </div>
                  <div className="time__item">
                    <div className="time__item-left">
                      <img src={icons.timeToCafe.icon} alt={'Время до кафе'} />
                      <p>Кафе</p>
                    </div>
                    <p className="time__item-right">{apart.timeToCafe}</p>
                  </div>
                  <div className="time__item">
                    <div className="time__item-left">
                      <img src={icons.timeToBusStop.icon} alt={'Время до автобусной остановки'} />
                      <p>Автобусная остановка</p>
                    </div>
                    <p className="time__item-right">{apart.timeToBusStop}</p>
                  </div>
                  <div className="time__item">
                    <div className="time__item-left">
                      <img src={icons.timeToBusCityCenter.icon} alt={'Время до центра города'} />
                      <p>Центр города</p>
                    </div>
                    <p className="time__item-right">{apart.timeToBusCityCenter}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
