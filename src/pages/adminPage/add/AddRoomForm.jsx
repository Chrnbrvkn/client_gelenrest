import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addRoomAsync } from "../../../store/features/lists/rooms/roomsFetch";
import { hideForm } from '../../../store/features/pages/adminSlice';
import "../admin.css";
import { roomFields } from "../../../constants/formFields";

export default function AddRoomForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [pictures, setPictures] = useState([]);
  const picturesInput = useRef();
  const dispatch = useDispatch();
  const selectedHouseId = useSelector((state) => state.adminPage.selectedHouseId);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 10) {
      alert("Вы не можете загрузить более 10 изображений за один раз.");
      return;
    }
    setPictures(selectedFiles);
  };

  const onSubmit = async (formData) => {
    const roomData = new FormData();
    Object.keys(formData).forEach(key => {
      roomData.append(key, formData[key]);
    });

    dispatch(addRoomAsync({ formData: roomData, houseId: selectedHouseId, pictures }));

    reset();
    picturesInput.current.value = '';
    dispatch(hideForm());
  };

  return (
    <div className="houses_form-add">
      <h2>Добавьте комнату</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="windows__update-list--points">
        {roomFields.map((field, index) => {
          if (field.type === "select") {
            return (
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
            );
          } else {
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
            );
          }
        })}

        <div className="photo windows__update-list--point button">
          <p>Фотографии комнаты (не больше 10 за раз)</p>
          <input
            type="file"
            name="roomImages"
            accept="image/*"
            onChange={handleImageChange}
            ref={picturesInput}
            multiple
          />
        </div>

        <button type="submit" className="save">Добавить комнату</button>
      </form>
    </div>
  );
}
