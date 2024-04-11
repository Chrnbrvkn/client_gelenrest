import React, { useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { houseFields } from "../../../constants/formFields";
import { addHouseAsync } from "../../../store/features/lists/houses/housesFetch";
import { setNotification } from "../../../store/features/notification/notificationSlice";



export default function AddHouseForm({ onCancel }) {
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm()

  const dispatch = useDispatch();
  const [pictures, setPictures] = useState([]);
  const picturesInput = useRef()

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 10) {
      alert("Вы не можете загрузить более 10 изображений за один раз.");
      return;
    }
    setPictures(selectedFiles);
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      dispatch(addHouseAsync({ formData, pictures }));
      reset()
      picturesInput.current.value = ''
      dispatch(setNotification({
        message: `Дом ${data.name} добавлен.`,
        type: 'success',
      }))
      onCancel()
    } catch (e) {
      dispatch(setNotification({
        message: `Ошибка при добавлении квартиры. 
        ${e.message}`,
        type: 'error',
      }))
      console.log(e);
    }
  }


  return (
    <div className="houses_form-add">
      <form onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="windows__update-list--points">
        {houseFields.map((field, index) => {

          if (field.type !== "select") {
            return (
              <div key={index} className={`windows__update-list--point ${field.type === "checkbox" ? "checkbox" : ""}`}>
                <label>{field.label}</label>
                <input
                  placeholder={field.label}
                  type={field.type}
                  {...register(field.name, { required: field.requare })}
                />
                {errors[field.name] && <p>{field.error}</p>}
              </div>
            )
          } else {
            <div key={index} className="windows__update-list--point">
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
          };
        }
        )}

        <div className="photo windows__update-list--point button">
          <p>Фотографии дома (не больше 10 за раз)</p>
          <input
            type="file"
            name="houseImages"
            accept="image/*"
            onChange={handleImageChange}
            ref={picturesInput}
            multiple
          />
        </div>

        <button type="submit" className="save">
          Добавить дом
        </button>
      </form>
    </div>
  )
}