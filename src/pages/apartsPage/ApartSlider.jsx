import { useState } from "react";
import leftArrow from '../../assets/images/icons/houses-icons/arrow-left.svg'
import rightArrow from '../../assets/images/icons/houses-icons/arrow-right.svg'


export default function ApartSlider({ apartPictures }) {

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prevSlide) => {
      if (prevSlide === 0) {
        return prevSlide = apartPictures.length - 1
      }
      return prevSlide - 1
    })
  }
  const nextSlide = () => {
    setCurrentIndex((prevSlide) => {
      if (prevSlide === apartPictures.length - 1) {
        return prevSlide = 0
      }
      return prevSlide + 1
    })
  }
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
      setIsActive(!isActive);
  };

  return (<>
    {apartPictures[0] &&
      <>
        <div  className={`slider__house ${isActive ? 'active' : ''}`}>
        <button className={`slider__house-closed ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
          <svg alt="close" width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z" />
              </svg>
          </button>
          <button className='house__slider-prev' onClick={prevSlide}>
            <img src={leftArrow} alt="" />
          </button>
          <img className={`slider__house-front ${isActive ? 'active' : ''}`} onClick={toggleMenu} src={`https://api.gelenrest.ru${apartPictures[currentIndex].url}`} />
          <button className='house__slider-next' onClick={nextSlide}>
            <img src={rightArrow} alt="" />
          </button>
        </div>
        <div className={`slider__house-photos ${isActive ? 'active' : ''}`}>
          {apartPictures.map((item, index) =>
            currentIndex !== index ? (
              <img key={index} id={index} className='house_photo' src={`https://api.gelenrest.ru${item.url}`} alt={`Image ${index}`} />
            ) : null
          )}
        </div>
      </>
    }
  </>)
}