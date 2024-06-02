import { useState } from "react";
import { useSwipeable } from 'react-swipeable';

export const useSlider = (pictures) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);


  const handleClickOutside = (e) => {
    if (isActive && !e.target.closest('.slider__house-front, .house__slider-prev, .house__slider-next')) {
      setIsActive(false);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const prevSlide = () => {
    setCurrentIndex(prev => prev === 0 ? pictures.length - 1 : prev - 1);
  }

  const nextSlide = () => {
    setCurrentIndex(prev => prev === pictures.length - 1 ? 0 : prev + 1);
  }

  const toggleMenu = () => {
    setIsActive(!isActive);
  };



  return {
    handlers,
    handleClickOutside,
    toggleMenu,
    prevSlide,
    nextSlide,
    isActive,
    currentIndex
  }
}