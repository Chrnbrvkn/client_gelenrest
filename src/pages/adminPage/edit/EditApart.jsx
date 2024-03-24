import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { apartFields } from "../../../constants/formFields";
import { updateApartAsync, deleteApartPictureAsync, uploadApartImagesAsync } from "../../../store/features/lists/aparts/apartsFetch";

export default function EditApart({ apartId, onCancel }) {
  const [pictures, setPictures] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.aparts.isLoading);
  const apart = useSelector(state => state.aparts.data.find(apart => apart.id === apartId)) || {};

const clearField = (fieldName) => {
  setValue(fieldName, '');
}

  useEffect(() => {
    Object.keys(apart).forEach(key => {
      setValue(key, apart[key]);
    });
  }, [apart, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    dispatch(updateApartAsync({ apartId, formData }))
      .unwrap()
      .then(() => {
        if (pictures.length > 0) {
          dispatch(uploadApartImagesAsync({ apartId, pictures }));
        }
      })
      .catch((e) => console.error('Failed to update apartment or upload images:', e.message))
      .finally(() => {
        reset();
        onCancel();
      });
};


  const handleImageChange = (e) => {
    setPictures([...e.target.files]);
};

  const handleDeleteImage = (imageId) => {
    dispatch(deleteApartPictureAsync({ apartId: apartId, imageId }));
  };

  const renderExistingImages = () => {
    return apart.images ? apart.images.map(picture => (
      <div key={picture.id}>
        <img className="edit__image" src={`https://api.gelenrest.ru${picture.url}`} alt="Apart" />
        <button onClick={() => handleDeleteImage(picture.id)}>Удалить</button>
      </div>
    )) : null;
  };


  return (
    isLoading ? (
      <div> Загрузка...</div >
    ) : (
      <div className="houses_form-add">
        <div>Изменить квартиру {apart.name}</div>
        <div className="edit__image-list">{renderExistingImages()}</div>
        <form onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="windows__update-list--points">
          {apartFields.map((field, index) => (
            <div key={index}
              className={`windows__update-list--point-1 windows__update-list--point ${field.type === 'checkbox' ? 'checkbox' : ''}`}>
              <label>{field.label}</label>
              <input
                placeholder={field.label}
                type={field.type}
                name={field.name}
                {...register(field.name, { required: field.requare })}
              />
              {errors[field.name] && <p>{field.error}</p>}
              <button type="button"
                onClick={() => clearField(field.name)}>
                Очистить
              </button>
            </div>
          ))}
          <div className="photo windows__update-list--point button">
            <p>Фотографии квартиры</p>
            <input
              type="file"
              name='apartImages'
              accept="image/*"
              onChange={handleImageChange}
              multiple
            />
          </div>
          <button type="submit" className="save">
            Сохранить квартиру
          </button>
        </form>
      </div>
    )
  )
}