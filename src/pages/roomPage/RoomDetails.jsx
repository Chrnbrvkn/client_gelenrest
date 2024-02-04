import React, { useState } from 'react'
import leftArrow from '../../assets/images/icons/houses-icons/arrow-left.svg';
import rightArrow from '../../assets/images/icons/houses-icons/arrow-right.svg';
import {roomIcons} from '../../constants/iconsPath'


export default function RoomDetails({ room, roomImages }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % roomImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + roomImages.length) % roomImages.length);
  
  return (
    <div className="room__main">
      <p className="room__main-title">{room.name}</p>
      <div className="room__main-content">
        <div className="room__main-left">
          <div className='slider__house'>
            <button className='house__slider-prev' onClick={prevSlide}>
              <img src={leftArrow} alt="Previous" />
            </button>
            {roomImages.length > 0 && (
              <img className="slider__house-front" src={`https://api.gelenrest.ru${roomImages[currentSlide].url}`} alt="Room" />
            )}
            <button className='house__slider-next' onClick={nextSlide}>
              <img src={rightArrow} alt="Next" />
            </button>
          </div>
          <button className='apart__item-btn--left'>
              Забронировать
          </button>
        </div>
        <div className="room__main-right">
              <div className="room__main-option">
                <div className='room__main-option--item'>
                  <div className="left">
                    <img src={roomIcons.roomsCount} alt="" />
                    <p>Количество комнат</p>
                  </div>
                  <div className="right">
                    {room.roomCount}
                  </div>
                </div>
                <div className='room__main-option--item'>
                  <div className="left">
                    <img src={roomIcons.bedroom} alt="" />
                    <p>Спальные места</p>
                  </div>
                  <div className="right">
                    {room.roomCount}
                  </div>
                </div>
                <div className='room__main-option--item'>
                  <div className="left">
                    <img src={roomIcons.level} alt="" />
                    <p>Этаж</p>
                  </div>
                  <div className="right">
                    {room.roomCount}
                  </div>
                </div>
                <div className='room__main-option--item'>
                  <div className="left">
                    <img src={roomIcons.bathroom} alt="" />
                    <p>Санузел</p>
                  </div>
                  <div className="right">
                    {room.roomCount}
                  </div>
                </div>
                <div className='room__main-option--item'>
                  <div className="left">
                    <img src={roomIcons.sharedKitchen} alt="" />
                    <p>Питание</p>
                  </div>
                  <div className="right">
                    {room.roomCount}
                  </div>
                </div>
              </div>
              <div className="room__main-facilities">
                {room.facilities}
              </div>
              <div className="room__main-price">
                <p>
                Цена: {room.price} р./сутки
                </p>
              </div>
              <p className='room__main-warning'>
              <span>Внимание! </span>Цены ориентировочные. Уточните цену у хозяина.
              </p>
        </div>
      </div>
    </div>
  );
}
