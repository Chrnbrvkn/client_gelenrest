import React, { useState } from 'react'
import leftArrow from '../../assets/images/icons/houses-icons/arrow-left.svg';
import rightArrow from '../../assets/images/icons/houses-icons/arrow-right.svg';


export default function RoomDetails({ room, roomImages }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % roomImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + roomImages.length) % roomImages.length);

  return (
    <div className="room__main">
      <p className="room__main-title">{room?.name}</p>
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
        </div>
      </div>
    </div>
  );
}
