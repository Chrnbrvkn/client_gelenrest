import React, { useState, useEffect } from "react";
import { useApiData } from "../../contexts/ApiProvider";
import leftArrow from "../../assets/images/icons/houses-icons/arrow-left.svg";
import rightArrow from "../../assets/images/icons/houses-icons/arrow-right.svg";
import { roomIcons } from "../../constants/iconsPath";
import { NavLink } from "react-router-dom";

export default function RoomCard({ room }) {
  const { roomsPictures } = useApiData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [roomImages, setRoomImages] = useState([]);

  useEffect(() => {
    const filteredImages = roomsPictures.filter(
      (pic) => pic.roomId === room.id
    );
    setRoomImages(filteredImages);
  }, [room.id, roomsPictures]);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % roomImages.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + roomImages.length) % roomImages.length
    );

  return (
    <div className="room__card">
      <h3>{room.name}</h3>
      <div className="room__card-content">
        <div className="room__card-left">
          <div className="slider__house">
            <button className="house__slider-prev" onClick={prevSlide}>
              <img src={leftArrow} alt="Previous" />
            </button>
            {roomImages.length > 0 && (
              <img
                className="slider__house-front"
                src={`https://api.gelenrest.ru${roomImages[currentSlide].url}`}
                alt="Room"
              />
            )}
            <button className="house__slider-next" onClick={nextSlide}>
              <img src={rightArrow} alt="Next" />
            </button>
          </div>
          <NavLink to={`https://localhost:5173/reservation/room/${room.id}`} className='apart__item-btn--left'>
            Забронировать
          </NavLink>
        </div>
        <div className="room__card-right">
          <div className="room__card-details">
            <div className="room__main-right">
              <div className="room__main-option">
                <div className="room__main-option--item">
                  <div className="left">
                    <img src={roomIcons.roomsCount.icon} alt="" />
                    <p>Количество комнат</p>
                  </div>
                  <div className="right">{room.roomCount}</div>
                </div>
                <div className="room__main-option--item">
                  <div className="left">
                    <img src={roomIcons.bedroom.icon} alt="" />
                    <p>Спальные места</p>
                  </div>
                  <div className="right">{room.roomCount}</div>
                </div>
                <div className="room__main-option--item">
                  <div className="left">
                    <img src={roomIcons.level.icon} alt="" />
                    <p>Этаж</p>
                  </div>
                  <div className="right">{room.roomCount}</div>
                </div>
                <div className="room__main-option--item">
                  <div className="left">
                    <img src={roomIcons.bathroom.icon} alt="" />
                    <p>Санузел</p>
                  </div>
                  <div className="right">{room.roomCount}</div>
                </div>
                <div className="room__main-option--item">
                  <div className="left">
                    <img src={roomIcons.sharedKitchen.icon} alt="" />
                    <p>Питание</p>
                  </div>
                  <div className="right">{room.roomCount}</div>
                </div>
              </div>
              <div className="room__main-facilities">{room.facilities}</div>
              <div className="room__main-price">
                <p>Цена: {room.price} р./сутки</p>
              </div>
              <p className="room__main-warning">
                <span>Внимание! </span>Цены ориентировочные. Уточните цену у
                хозяина.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
