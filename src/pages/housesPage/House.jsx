import React, { useEffect, useState } from 'react';

import altPicture from '/src/assets/images/homeCards/home-1.png'
import { NavLink, Link } from "react-router-dom";
import '../../assets/styles/pagesStyles/house.css'
import HouseSlider from './HouseSlider';
import { useParams } from 'react-router-dom';

import { icons, roomIcons } from '../../constants/iconsPath';
import humanIcon from '../../assets/images/icons/houses-icons/man.svg'
import useScrollTop from '../../hooks/useScrollTop';
import { useModals } from '../../contexts/ModalsProvider';
import { useDispatch, useSelector } from 'react-redux'
import { fetchHousesAsync } from '../../store/features/lists/houses/housesFetch';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchAllRoomsAsync } from '../../store/features/lists/rooms/roomsFetch';
import HumanIcons from '../../shared/ui/HumanIcons/HumanIcons';

export default function House() {
  useScrollTop()

  const houses = useSelector(state => state.houses.data);
  const rooms = useSelector(state => state.rooms.data);
  const isLoading = useSelector(state => state.loading.isLoading);

  const dispatch = useDispatch()

  useEffect(_ => {
    dispatch(fetchHousesAsync())
    dispatch(fetchAllRoomsAsync())
  }, [dispatch])


  const { openBookingModal, isOpen, bookingModal } = useModals()

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



  if (isLoading || !house) {
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
        {house.images.length > 0 
        ? 
        <HouseSlider housePictures={house.images} /> 
        : 
        <img src={altPicture} alt="house"  className='slider__house'/>}
        
        <a className='adress__link' href="#">{house.adress}</a>
        <h6 className="description__title">Описание</h6>
        <p className="house__description">
          {house.description_2}
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
                <HumanIcons item={room} />
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
                  <img className="apart__item-img"
                    src={room.images[0]?.url ?
                      `https://api.gelenrest.ru${room.images[0]?.url}` : altPicture}
                    alt={room.name}
                  />
                  <div className="apart__item-icons">
                    <div className="apart__item-icon">
                      <img src={roomIcons.bedroom.icon} alt="Спальня" />
                      {room.roomCount < 2 ? (
                        <p>{`${room.roomCount} спальное место`}</p>
                      ) : (
                        <p>{`${room.roomCount} спальных места`}</p>
                      )}
                    </div>
                    <div className="apart__item-icon">
                      <img src={icons.internet.icon} alt="Интернет" />
                      <p>Интернет</p>
                    </div>
                    <div className="apart__item-icon">
                      <img src={icons.refrigerator.icon} alt="Холодильник" />
                      <p>Холодильник</p>
                    </div>
                    <div className="apart__item-icon">
                      <img src={roomIcons.bathroom.icon} alt="Санузел" />
                      <p>Санузел</p>
                    </div>
                  </div>
                  <HumanIcons item={room}  />
                  <div className="apart__item-buttons">
                    <NavLink to={`/houses/${houseId}/rooms/${room.id}`}
                      className='apart__item-btn--left' >
                      Подробнее
                    </NavLink>
                    <button onClick={() => openBookingModal(room)} className='apart__item-btn--right'>Забронировать</button>
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
