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

  return (<>
    {apartPictures[0] &&
      <>
        <div className='slider__house'>
          <button className='house__slider-prev' onClick={prevSlide}>
            <img src={leftArrow} alt="" />
          </button>
          <img className="slider__house-front" src={`https://45.80.69.128:3000${apartPictures[currentIndex].url}`} />
          <button className='house__slider-next' onClick={nextSlide}>
            <img src={rightArrow} alt="" />
          </button>
        </div>
        <div className='slider__house-photos'>
          {apartPictures.map((item, index) =>
            currentIndex !== index ? (
              <img key={index} id={index} className='house_photo' src={`https://45.80.69.128:3000${item.url}`} alt={`Image ${index}`} />
            ) : null
          )}
        </div>
      </>
    }
  </>)
}