import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { apartFields } from "../../../constants/formFields";
import { updateApartAsync, deleteApartPictureAsync, uploadApartImagesAsync } from "../../../store/features/lists/aparts/apartsFetch";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { setNotification } from "../../../store/features/notification/notificationSlice";


export default function EditApart({ apartId, onCancel }) {
  const [pictures, setPictures] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.loading.isLoading);
  const apart = useSelector(state => state.aparts.data.find(apart => apart.id === apartId)) || {};

  useEffect(() => {
    Object.keys(apart).forEach(key => {
      setValue(key, apart[key]);
    });
  }, [apart, setValue]);

  const clearField = (fieldName) => {
    setValue(fieldName, '');
  }

  const handleImageChange = (e) => {
    setPictures([...e.target.files]);
  };


  const handleDeleteImage = (imageId) => {
    try {
      dispatch(deleteApartPictureAsync({ apartId: apartId, imageId }))
      dispatch(setNotification({
        message: `Фотография удалена.`,
        type: 'success',
      }));
    } catch (e) {
      dispatch(setNotification({
        message: `Ошибка при удалении фотографии. 
        ${e.message}`,
        type: 'error',
      }))
      console.log(e);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));

      await dispatch(updateApartAsync({ apartId, formData })).unwrap()

      if (pictures.length > 0) {
        await dispatch(uploadApartImagesAsync({ apartId, pictures })).unwrap();
      }

      reset();
      dispatch(setNotification({
        message: `Квартира ${data.name} изменена.`,
        type: 'success',
      }))
      onCancel();
    } catch (e) {
      dispatch(setNotification({
        message: `Ошибка при изменении квартиры. 
        ${e.message}`,
        type: 'error',
      }))
      console.log(e);
    }
  };
  // const onSubmit = async (data) => {
  //   const formData = new FormData();
  //   Object.keys(data).forEach(key => formData.append(key, data[key]));

  //   dispatch(updateApartAsync({ apartId, formData }))
  //     .unwrap()
  //     .then(() => {
  //       if (pictures.length > 0) {
  //         dispatch(uploadApartImagesAsync({ apartId, pictures }));
  //       }
  //     })
  //     .catch((e) => console.error('Failed to update apartment or upload images:', e.message))
  //     .finally(() => {
  //       reset();
  //       onCancel();
  //     });
  // };


  const renderExistingImages = () => {
    return apart.images ? apart.images.map(picture => (
      <div key={picture.id}>
        <img className="edit__image" src={`https://api.gelenrest.ru${picture.url}`} alt="Apart" />
        <button className='houses__list-delete' onClick={() => handleDeleteImage(picture.id)}>Удалить</button>
      </div>
    )) : null;
  };


  return (
    isLoading ? (
      <LoadingSpinner />
    ) : (
      <div className="houses_form-add">
        <div>Изменить квартиру {apart.name}</div>
        <div className="edit__image-list">
          {renderExistingImages()}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="windows__update-list--points"
        >
          {apartFields.map((field, index) => {

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
            )
          })}

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