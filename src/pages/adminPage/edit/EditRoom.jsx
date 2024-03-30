import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { roomFields } from "../../../constants/formFields";
import { updateRoomAsync, deleteRoomPictureAsync, uploadRoomImagesAsync } from "../../../store/features/lists/rooms/roomsFetch";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function EditRoom({ roomId, onCancel }) {
  const [pictures, setPictures] = useState([]);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();

  const selectedHouseId = useSelector((state) => state.adminPage.selectedHouseId);

  const isLoading = useSelector(state => state.rooms.isLoading);

  const room = useSelector(state =>
    state.rooms.roomsByHouseId[selectedHouseId]?.find(room => room.id === roomId)) || {};

  const clearField = (fieldName) => {
    setValue(fieldName, "");
  };

  useEffect(() => {
    console.log(room);
    Object.keys(room).forEach(key => {
      setValue(key, room[key]);
    });
  }, [room, setValue]);

  const handleImageChange = (e) => {
    setPictures([...e.target.files]);
  };

  const handleDeleteImage = (imageId) => {
    dispatch(deleteRoomPictureAsync({ houseId: selectedHouseId, roomId, imageId }));
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

  const renderExistingImages = () => {
    return room.images ? room.images.map(picture => (
      <div key={picture.id}>
        <img
          className="edit__image"
          src={`https://api.gelenrest.ru${picture.url}`}
          alt="Room"
        />
        <button onClick={() => handleDeleteImage(picture.id)}>Удалить</button>
      </div>
    )) : null;
  };

  return (
    isLoading ? (
      <LoadingSpinner />
    ) : (
      <div className="houses_form-add">
        <h2>Изменить комнату {room.name}</h2>
        <div className="edit__image-list">
          {renderExistingImages()}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="windows__update-list--points"
          encType="multipart/form-data"
        >
          {roomFields.map((field, index) => {

            if (field.type === 'price') {
              return (
                <div key={index}
                  className="windows__update-loist--point">
                  <label>{field.label}</label>
                  <input type={field.type}
                    placeholder={field.label}
                    min={0}
                    step={'0.01'}
                    name={field.name}
                    {...register(field.name, { required: field.requare })}
                  />

                </div>
              )
            }

            if (field.type === "select") {
              return (
                <div key={index}
                  className="windows__update-list--point">
                  <label>{field.label}</label>
                  <select {...register(field.name, { required: field.requare })}>
                    {field.options.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors[field.name] && <p>{field.error}</p>}
                </div>
              );
            }

            return (
              <div key={index}
                className={`windows__update-list--point-1 windows__update-list--point ${field.type === 'checkbox' ? 'checkbox' : ''}`}>
                <label>{field.label}</label>
                <input
                  placeholder={field.placeholder}
                  type={field.type}
                  {...register(field.name, { required: field.require })}
                />
                {errors[field.name] && <span className="error">{field.error}</span>}
                <button type="button"
                  onClick={() => clearField(field.name)}>
                  Очистить
                </button>
              </div>
            )
          })}
          <div>
            <label>Фотографии комнаты:</label>
            <input
              onChange={handleImageChange}
              name="houseImages"
              type="file"
              accept="image/*"
              multiple
            />
          </div>
          <button type="submit" className="save">Сохранить изменения</button>
        </form>
      </div>
    )
  );
}
