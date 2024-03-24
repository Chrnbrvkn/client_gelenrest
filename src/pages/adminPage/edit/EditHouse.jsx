import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { updateHouseAsync, uploadHouseImagesAsync, deleteHousePictureAsync } from "../../../store/features/lists/houses/housesFetch";
import { houseFields } from "../../../constants/formFields";



export default function EditHouse({ houseId, onCancel }) {
  const [pictures, setPictures] = useState([]);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.houses.isLoading);
  const house = useSelector(state => state.houses.data.find(house => house.id === houseId)) || {};

  const clearField = (fieldName) => {
    setValue(fieldName, "");
  };

  useEffect(() => {
    Object.keys(house).forEach(key => {
      setValue(key, house[key]);
    });
  }, [house, setValue]);

  const onSubmit = async (data) => {

    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    dispatch(updateHouseAsync({ houseId, formData }))
      .unwrap()
      .then(() => {
        if (pictures.length > 0) {
          dispatch(uploadHouseImagesAsync({ houseId, pictures }));
        }
      })
      .catch(e => console.error('Failed to update house or upload images:', e.message))
      .finally(() => {
        reset();
        onCancel();
      });
  };

  const handleImageChange = (e) => {
    setPictures([...e.target.files]);
  };

  const handleDeleteImage = (imageId) => {
    dispatch(deleteHousePictureAsync({ houseId, imageId }));
  }

  const renderExistingImage = () => {
    return house.images ? house.images.map(picture => (
      <div key={picture.id}>
        <img
          className="edit__image"
          src={"https://api.gelenrest.ru" + picture.url}
          alt="House"
        />
        <button onClick={() => handleDeleteImage(picture.id)}>Удалить</button>
      </div>
    )) : null;
  }



  return (
    isLoading ? (
      <div> Загрузка...</div >
    ) : (
      <div className="houses_form-add">
        <div>Изменить дом {house.name}</div>
        <div className="edit__image-list">{renderExistingImage()}</div>
        <form
          className="windows__update-list--points"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          {houseFields.map((field, index) => (
            <div className={`windows__update-list--point-1 windows__update-list--point ${field.type === 'checkbox' ? 'checkbox' : ''}`} key={index}>
              <label>{field.label}</label>
              <input
                placeholder={field.label}
                type={field.type}
                name={field.name}
                {...register(field.name, { required: field.requare })}
              />
              {errors[field.name] && <span>{field.error}</span>}
              <button type="button" onClick={() => clearField(field.name)}>
                Очистить
              </button>
            </div>
          ))}
          <div className="photo windows__update-list--point button">
            <label>Фотографии дома</label>
            <input
              type="file"
              name="houseImages"
              accept="image/*"
              onChange={handleImageChange}
              multiple
            />
          </div>
          <button className="save" type="submit">Сохранить дом</button>
        </form>
      </div>
    )
  );
}
