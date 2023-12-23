import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { getHouseAllImages, getHouses } from '../../api/housesApi';
import '../../assets/styles/pagesStyles/houses.css';
import altPicture from '../../assets/images/homeCards/home-1.png'
import seaIcon from '../../assets/images/icons/sea.svg';
import shopIcon from '../../assets/images/icons/shop.svg';
import cafeIcon from '../../assets/images/icons/cafe.svg';
import busIcon from '../../assets/images/icons/bus.svg';
import mapIcon from '../../assets/images/icons/map.svg';

export default function Houses() {
  const [houses, setHouses] = useState([]);
  const [housePictures, setHousePictures] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("try");
        const housesData = await getHouses()
        if (housesData) {
          console.log("if");
          setHouses(housesData)
        }
        const pictures = await getHouseAllImages()
        setHousePictures(pictures)
      } catch (e) {
        console.log("catch");
        console.log(e);
      }
    }
    fetchData()
  }, []);
  console.log(houses);
  const handleHouseImage = (houseId) => {
    const picture = housePictures.find(pic => pic.houseId === houseId)
    return picture ? `https://api.gelenrest.ru${picture.url}` : altPicture
  }

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

  return (
    <section className="houses">
      <div className="container">
        <ul className="breadcrumb">
          <li className='breadcrumb__item'>
            <a href="#">
              Главная
            </a>
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
                  <a className="house__item-button--left" href="#">Забронировать</a>
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
  );
}

//   return (
//     <section className="houses">
//       <div className="container">
//         <ul className="breadcrumb">
//           <li className='breadcrumb__item'>
//             <a href="#">
//               Главная
//             </a>
//           </li>
//           <li className='breadcrumb__item'>
//             Дома
//           </li>
//         </ul>
//         <div className="houses__items">
//           {houses.map((itemdiv, index) => {
//             return (
//               <div key={index} className="house__item">
//                 <h5 className="house__item-title house__item-title--min">
//                   {item.name}
//                 </h5>
//                 <div className="house__item__left">
//                   <img className='house__item-img' src={item.picture} alt="" />
//                   <div className="house__item-buttons">
//                     <a className="house__item-button--left" href="#">Забронировать</a>
//                     <a className="house__item-button--right" href="#">Смотреть номера</a>
//                   </div>
//                 </div>
//                 <div className="house__item-right">
//                   <h5 className="house__item-title house__item-title--max">
//                     {item.name}
//                   </h5>
//                   <div className="house__item-prop">
//                     <div className="prop__item">
//                       <p className="prop__item-left">
//                         Количество номеров
//                       </p>
//                       <p className="prop__item-right">
//                         {item.roomCount}
//                       </p>
//                     </div>
//                     <div className="prop__item">
//                       <p className="prop__item-left">
//                         Категории номеров
//                       </p>
//                       <p className="prop__item-right">
//                         {item.roomCategories}
//                       </p>
//                     </div>
//                     <div className="prop__item">
//                       <p className="prop__item-left">
//                         Питание
//                       </p>
//                       <p className="prop__item-right">
//                         {item.meal}
//                       </p>
//                     </div>
//                     <div className="prop__item">
//                       <p className="prop__item-left">
//                         Условия бронирования
//                       </p>
//                       <p className="prop__item-right">
//                         {item.bookingConditions}
//                       </p>
//                     </div>
//                     <div className="prop__item">
//                       <p className="prop__item-left">
//                         Расчетный час
//                       </p>
//                       <p className="prop__item-right">
//                         {item.checkoutTime}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="house__item-time">
//                     <div className="time__item">
//                       <div className="time__item-left">
//                         <img src="src../public/assets/images/icons/sea.svg" alt="" />
//                         <p>Море</p>
//                       </div>
//                       <p className="time__item-right">
//                         {item.timeTo.sea}
//                       </p>
//                     </div>
//                     <div className="time__item">
//                       <div className="time__item-left">
//                         <img src="src../public/assets/images/icons/shop.svg" alt="" />
//                         <p>Рынок</p>
//                       </div>
//                       <p className="time__item-right">
//                         {item.timeTo.market}
//                       </p>
//                     </div>
//                     <div className="time__item">
//                       <div className="time__item-left">
//                         <img src="src../public/assets/images/icons/cafe.svg" alt="" />
//                         <p>Кафе</p>
//                       </div>
//                       <p className="time__item-right">
//                         {item.timeTo.cafe}
//                       </p>
//                     </div>
//                     <div className="time__item">
//                       <div className="time__item-left">
//                         <img src="src../public/assets/images/icons/bus.svg" alt="" />
//                         <p>Автобусная остановка</p>
//                       </div>
//                       <p className="time__item-right">
//                         {item.timeTo.busStop}
//                       </p>
//                     </div>
//                     <div className="time__item">
//                       <div className="time__item-left">
//                         <img src="src../public/assets/images/icons/map.svg" alt="" />
//                         <p>Центр города</p>
//                       </div>
//                       <p className="time__item-right">
//                         {item.timeTo.cityCenter}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }