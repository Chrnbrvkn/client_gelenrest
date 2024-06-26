import React, { useState, useEffect } from "react";
import { useSwipeable } from 'react-swipeable';
import { useApiData } from "../../contexts/ApiProvider";
import leftArrow from "../../assets/images/icons/houses-icons/arrow-left.svg";
import rightArrow from "../../assets/images/icons/houses-icons/arrow-right.svg";
import { roomIcons } from "../../constants/iconsPath";
import { NavLink } from "react-router-dom";
import { useModals } from "../../contexts/ModalsProvider";





export default function RoomCard({ room, roomImages}) {

  const { openBookingModal, isOpen, setIsOpen } = useModals()

  // const { roomsPictures } = useApiData();
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [roomImages, setRoomImages] = useState([]);

  const [isActive, setIsActive] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });


  // useEffect(() => {
  //   const filteredImages = roomsPictures.filter(
  //     (pic) => pic.roomId === room.id
  //   );
  //   setRoomImages(filteredImages);
  // }, [room.id, roomsPictures]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % roomImages.length);

  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + roomImages.length) % roomImages.length
    );

  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  const handleClickOutside = (e) => {
    if (isActive && !e.target.closest('.slider__house-front, .house__slider-prev, .house__slider-next')) {
      setIsActive(false);
    }
  };
  return (
    <div className="room__card">
      <h3>{room.name}</h3>
      <div className="room__card-content">
        <div onClick={handleClickOutside} className="room__card-left">
          <div {...handlers} className={`slider__house ${isActive ? 'active' : ''}`}>
            <button className={`slider__house-closed ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
              <svg alt="close" width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z" />
              </svg>
            </button>
            <button className="house__slider-prev" onClick={prevSlide}>
              <img src={leftArrow} alt="Previous" />
            </button>
            {roomImages.length > 0 && (
              <img
                className={`slider__house-front ${isActive ? 'active' : ''}`} onClick={toggleMenu}
                src={roomImages[currentSlide]}
                alt="Room"
              />
            )}
            <button className="house__slider-next" onClick={nextSlide}>
              <img src={rightArrow} alt="Next" />
            </button>
          </div>
          <button onClick={() => openBookingModal(room)} className='apart__item-btn--left'>
            Забронировать
          </button>
          {/* <NavLink to={`https://localhost:5173/reservation/room/${room.id}`} className='apart__item-btn--left'>
            Забронировать
          </NavLink> */}
        </div>
        <div className="room__card-right">
          <div className="room__card-details">
            <div className="room__main-right">
              <div className="room__main-option">
                <div className="room__main-option--item">
                  <div className="left">
                    <img src={roomIcons.roomsCount.icon} alt="roomsCount" />
                    <p>Количество комнат</p>
                  </div>
                  <div className="right">{room.roomCount}</div>
                </div>
                <div className="room__main-option--item">
                  <div className="left">
                    <img src={roomIcons.bedroom.icon} alt="bedroom" />
                    <p>Спальные места</p>
                  </div>
                  <div className="right">{room.bedroom}</div>
                </div>
                <div className="room__main-option--item">
                  <div className="left">
                    <img src={roomIcons.level.icon} alt="level" />
                    <p>Этаж</p>
                  </div>
                  <div className="right">{room.level}</div>
                </div>
                <div className="room__main-option--item">
                  <div className="left">
                    <img src={roomIcons.bathroom.icon} alt="bathroom" />
                    <p>Санузел</p>
                  </div>
                  <div className="right">{room.bathroom}</div>
                </div>
                <div className="room__main-option--item">
                  <div className="left">
                    <img src={roomIcons.sharedKitchen.icon} alt="Kitchen" />
                    <p>Кухня</p>
                  </div>
                  <div className="right">{room.meal}</div>
                </div>
              </div>
              {/* <div className="room__main-facilities">{room.facilities}</div> */}
              <div className="room__main-price">
                <p>Цена: {room.price} р./сутки</p>
              </div>
              {/* <p className="room__main-warning">
                <span>Внимание! </span>Цены ориентировочные. Уточните цену у
                хозяина.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
