import React, { useEffect, useState } from 'react';
import { getApartImages, getApart, getAparts } from '../../api/apartsApi.js'
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
  const { apartId } = useParams();
  const [apart, setApart] = useState([])
  const [aparts, setAparts] = useState([])
  const [apartPictures, setApartPictures] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apartData = await getApart(apartId)
        if (apartData) {
          setApart(apartData)
        }
        const apartsData = await getAparts()
        if (apartsData) {
          setAparts(apartsData)
        }
        const apartPics = await getApartImages(apartId)
        setApartPictures(apartPics)
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
  }, []);

  apart.services = [
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
  const handleApartImage = (roomId) => {
    const pic = apartPictures.find((pic) => pic.roomId === roomId)
    return pic ? `https://api.gelenrest.ru${pic.url}` : altPicture
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
            {apart.name}
          </li>
        </ul>
        <h2>{apart.name}</h2>
        <p className="house__description-first">
          {apart.description_1}
        </p>
        <ApartSlider apartPictures={apartPictures} />
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
            {apart.services && renderServices(apart.services)}
          </div>
        </div>
        <p className="house__description">
          {apart.description_3}
        </p>
        <p className="house__description">
          {apart.description_4}
        </p>
      </div>
      {/* изменить названия классов с apart на room */}
      <Link to={`/reservation/apartment/${apart.id}`} className="apart__item-btn--right">Забронировать квартиру</Link>
      <div className="apart__list">
        <ul className="apart__list-items">
          {aparts.map((apart, index) => (
            <li key={index} className="apart__list-item">
              {Array.from({ length: apart.roomCount }, (_, index) => (
                <img key={index} src={humanIcon} alt={apart.name} />
              ))
              }
              <a href="#">{apart.name}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="apart">
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
                  <a className='apart__item-btn--left' href="#">Подробнее</a>
                  <a className='apart__item-btn--right' href="#">Забронировать</a>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div> */}
    </section>
  )
}
