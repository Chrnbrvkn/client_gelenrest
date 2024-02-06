import React, { useMemo } from 'react';
import { NavLink } from "react-router-dom";

import '../../assets/styles/pagesStyles/houses.css';
import altPicture from '../../assets/images/homeCards/home-1.png'
import { useApiData } from '../../contexts/ApiProvider';
import { useData } from '../../contexts/DataProvider';
import { icons } from '../../constants/iconsPath'
import useScrollTop from '../../hooks/useScrollTop';

export default function Aparts() {
  useScrollTop()
  const { isLoading } = useData()
  const { aparts, apartsPictures } = useApiData();

  const handleApartImage = useMemo(() => {
    return (apartId) => {
      const picture = apartsPictures.find(pic => pic.apartId === apartId);
      return picture ? `https://api.gelenrest.ru${picture.url}` : altPicture;
    }
  }, [apartsPictures]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (<>
    <section className="houses">
      <div className="container">
        <ul className="breadcrumb">
          <li className="breadcrumb__item">
            <NavLink to={`/`}>
              Главная
            </NavLink>
          </li>
          <li className="breadcrumb__item">
            Квартиры
          </li>
        </ul>
        <div className="houses__items">
          {aparts.map(apart => (
            <div key={apart.id} className="house__item">
              <h5 className="house__item-title house__item-title--min">
                {apart.name}
              </h5>
              <div className="house__item__left">
                <img src={handleApartImage(apart.id)} alt={apart.name} className="house__item-img" />
                <div className="house__item-buttons">
                  {/* <NavLink className="house__item-button--left" to={`/reservation`}>Забронировать</NavLink> */}
                  <NavLink to={`/apartments/${apart.id}`} className="house__item-button-right">Смотреть квартиру</NavLink>
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
                    <p className="prop__item-left">Питание</p>
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
  </>

  )
}