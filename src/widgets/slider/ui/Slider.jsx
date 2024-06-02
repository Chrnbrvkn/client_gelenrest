import React from "react";
import { useSlider } from "../lib/useSlider";
import leftArrow from "../../../assets/images/icons/houses-icons/arrow-left.svg";
import rightArrow from "../../../assets/images/icons/houses-icons/arrow-right.svg";
import CloseSlider from "../../../assets/svgs/closeSlider.svg?react";
import { serverUrl } from "../../../constants/baseUrl";
// import "./slider.css";

export function Slider({ pictures }) {
  const {
    handlers,
    handleClickOutside,
    toggleMenu,
    prevSlide,
    nextSlide,
    isActive,
    currentIndex,
  } = useSlider(pictures);

  return (
    <div onClick={handleClickOutside}>
      <>
        <div
          {...handlers}
          className={`slider__house ${isActive ? "active" : ""}`}
        >
          <button
            className={`slider__house-closed ${isActive ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <CloseSlider />
          </button>
          <button className="house__slider-prev" onClick={prevSlide}>
            <img src={leftArrow} alt="prev" />
          </button>
          <img
            className={`slider__house-front ${isActive ? "active" : ""}`}
            onClick={toggleMenu}
            src={`${serverUrl}${pictures[currentIndex].url}`}
          />
          <button className="house__slider-next" onClick={nextSlide}>
            <img src={rightArrow} alt="next" />
          </button>
        </div>
        <div className={`slider__house-photos ${isActive ? "active" : ""}`}>
          {pictures.map((item, index) =>
            currentIndex !== index ? (
              <img
                key={index}
                id={index}
                className="house_photo"
                src={`${serverUrl}${item.url}`}
                alt={`Image ${index}`}
              />
            ) : null
          )}
        </div>
      </>
    </div>
  );
}
