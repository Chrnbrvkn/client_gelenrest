import React, { useEffect, useMemo } from 'react';
import { NavLink } from "react-router-dom";

import '../../assets/styles/pagesStyles/houses.css';

import { useDispatch, useSelector } from 'react-redux'

import { fetchHousesAsync } from "../../store/features/lists/houses/housesFetch";

import { icons } from '../../constants/iconsPath'
import useScrollTop from '../../hooks/useScrollTop';
import alterPicture from '../../assets/images/homeCards/home-1.png'

import LoadingSpinner from '../../components/LoadingSpinner';

export default function Houses() {
  useScrollTop()

  const houses = useSelector(state => state.houses.data);
  const isLoading = useSelector(state => state.loading.isLoading);

  const dispatch = useDispatch()

  useEffect(_ => {
    dispatch(fetchHousesAsync())
  }, [dispatch])



  return (

    isLoading ? <LoadingSpinner /> : (
      <section className="houses">
        <div className="container">
          <ul className="breadcrumb">
            <li className="breadcrumb__item">
              <NavLink to={`/`}>Главная</NavLink>
            </li>
            <li className="breadcrumb__item">Дома</li>
          </ul>
          <div className="houses__items">
            {houses.map(house => (
              <div key={house.id} className="house__item">
                <h5 className="house__item-title house__item-title--min">{house.name}</h5>
                <div className="house__item__left">
                  <img src={house.images[0]?.url ?
                    `https://api.gelenrest.ru${house.images[0].url}` : alterPicture}
                    alt={house.name}
                    className="house__item-img"
                  />
                  <div className="house__item-buttons">
                    {/* <NavLink className="house__item-button-left" to={`/reservation/house/${house.id}`}>Забронировать</NavLink> */}
                    <NavLink className="house__item-button-right" to={`/houses/${house.id}`}>Смотреть дом</NavLink>
                  </div>
                </div>
                <div className="house__item-right">
                  <h5 className="house__item-title house__item-title--max">{house.name}</h5>
                  <div className="house__item-prop">
                    <div className="prop__item">
                      <p className="prop__item-left">Адрес</p>
                      <p className="prop__item-left">{house.address}</p>
                    </div>
                    <div className="prop__item">
                      <p className="prop__item-left">Количество спальных мест</p>
                      <p className="prop__item-left">{house.roomCount}</p>
                    </div>
                    <div className="prop__item">
                      <p className="prop__item-left">Категории комнат</p>
                      <p className="prop__item-left">{house.roomCategories}</p>
                    </div>
                    <div className="prop__item">
                      <p className="prop__item-left">Питание</p>
                      <p className="prop__item-left">{house.meal}</p>
                    </div>
                    <div className="prop__item">
                      <p className="prop__item-left">Условия бронирования</p>
                      <p className="prop__item-left">{house.bookingConditions}</p>
                    </div>
                    <div className="prop__item">
                      <p className="prop__item-left">Расчетный час</p>
                      <p className="prop__item-right">{house.checkoutTime}</p>
                    </div>
                  </div>
                  <div className="house__item-time">
                    <div className="time__item">
                      <div className="time__item-left">
                        <img src={icons.timeToSea.icon} alt={'Время до моря'} />
                        <p>Море</p>
                      </div>
                      <p className="time__item-right">{house.timeToSea}</p>
                    </div>
                    <div className="time__item">
                      <div className="time__item-left">
                        <img src={icons.timeToMarket.icon} alt={'Время до магазина'} />
                        <p>Магазин</p>
                      </div>
                      <p className="time__item-right">{house.timeToMarket}</p>
                    </div>
                    <div className="time__item">
                      <div className="time__item-left">
                        <img src={icons.timeToCafe.icon} alt={'Время до кафе'} />
                        <p>Кафе</p>
                      </div>
                      <p className="time__item-right">{house.timeToCafe}</p>
                    </div>
                    <div className="time__item">
                      <div className="time__item-left">
                        <img src={icons.timeToBusStop.icon} alt={'Время до автобусной остановки'} />
                        <p>Автобусная остановка</p>
                      </div>
                      <p className="time__item-right">{house.timeToBusStop}</p>
                    </div>
                    <div className="time__item">
                      <div className="time__item-left">
                        <img src={icons.timeToBusCityCenter.icon} alt={'Время до центра города'} />
                        <p>Центр города</p>
                      </div>
                      <p className="time__item-right">{house.timeToBusCityCenter}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
}
