
import React, { useRef, useState } from "react";
import { uploadApartImagesAsync } from "../../../store/features/lists/aparts/apartsFetch";
import { uploadHouseImagesAsync } from "../../../store/features/lists/houses/housesFetch";
import { uploadRoomImagesAsync } from "../../../store/features/lists/rooms/roomsFetch";
import { useDispatch } from "react-redux";
import { setNotification  } from "../../../store/features/notification/notificationSlice";



export const useImageUpload = (id, type) => {
  
  const dispatch = useDispatch();
  const uploadImages = {
    apart: uploadApartImagesAsync,
    house: uploadHouseImagesAsync,
    room: uploadRoomImagesAsync,
  };

  const inputRef = useRef();
  const [pictures, setPictures] = useState([]);
  const handleImageInput = () => {
    inputRef.current.click();
  };
  const handleImageChange = (e) => {
    setPictures([...e.target.files]);
  };
  const handleReset = () => {
    setPictures([]);
    inputRef.current.value = "";
  };

  const handleUploadImages = async () => {
    try {
      if (pictures.length > 0) {
        await dispatch(
          uploadImages[type]({ [`${type}Id`]: id, pictures })
        ).unwrap();
      }
      dispatch(
        setNotification({
          message: `Загружены ${pictures.length} фотографии.`,
          type: "success",
        })
      );
    } catch (e) {
      dispatch(
        setNotification({
          message: `Ошибка при загрузки фотографии. 
        ${e.message}`,
          type: "error",
        })
      );
      console.log(e);
    }
  };
  return {
    handleImageInput,
    handleImageChange,
    handleReset,
    handleUploadImages,
    pictures,
    inputRef,
  };
}