import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { roomFields } from "../../../constants/formFields";
import { updateRoomAsync, deleteRoomPictureAsync, uploadRoomImagesAsync } from "../../../store/features/lists/rooms/roomsFetch";
import { hideForm } from '../../../store/features/pages/adminSlice';

export default function EditRoom({ roomId, onCancel }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [pictures, setPictures] = useState([]);
  const selectedHouseId = useSelector((state) => state.adminPage.selectedHouseId);
  const room = useSelector(state => state.rooms.allRooms.find(room => room.id === roomId)) || {};
  const isLoading = useSelector(state => state.loading.isLoading);

  useEffect(() => {
    Object.keys(room).forEach(key => {
      setValue(key, room[key]);
    });
  }, [room, setValue]);

  const handleImageChange = (e) => {
    setPictures([...e.target.files]);
  };

  const handleDeleteImage = (imageId) => {
    dispatch(deleteRoomPictureAsync({ roomId, imageId }));
  };

  const renderExistingImages = () => {
    return room.images ? room.images.map(picture => (
      <div key={picture.id}>
        <img className="edit__image" src={`https://api.gelenrest.ru${picture.url}`} alt="Room" />
        <button onClick={() => handleDeleteImage(picture.id)}>Удалить</button>
      </div>
    )) : null;
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
  
    await dispatch(updateRoomAsync({ roomId, houseId: selectedHouseId, roomData: formData }))
      .unwrap()
      .then(() => {
        if (pictures.length > 0) {
          dispatch(uploadRoomImagesAsync({ roomId, pictures }));
        }
      })
      .catch((e) => console.error('Failed to update room or upload images:', e.message))
      .finally(() => {
        reset();
        onCancel()
      });
  };

  
  return (
    isLoading ? (
      <div> Загрузка...</div>
    ) : (
      <div className="edit-room-form">
        <h2>Изменить комнату {room.name}</h2>
        <div className="edit__image-list">{renderExistingImages()}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="room-form">
          {roomFields.map((field, index) => (
            <div key={index} className="form-field">
              <label>{field.label}</label>
              <input
                placeholder={field.placeholder}
                type={field.type}
                {...register(field.name, { required: field.required })}
              />
              {errors[field.name] && <span className="error">{field.error}</span>}
            </div>
          ))}
          <div>
            <label>Фотографии комнаты:</label>
            <input type="file" multiple onChange={handleImageChange} />
          </div>
          <button type="submit" className="btn-save">Сохранить изменения</button>
        </form>
      </div>
    )
  );
}
