import { useForm } from "react-hook-form";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  getRoom,
  updateRoom,
  getRoomImages,
  uploadRoomPictures,
  deleteRoomPicture,
} from "../../../api/roomsApi";
import { roomFields } from "../../../constants/formFields.js";

export default function EditRoom({ houseId, roomId, onEditSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [pictures, setPictures] = useState([]);
  const [existingPictures, setExistingPictures] = useState([]);
  const picturesInput = useRef();
  const [roomName, setRoomName] = useState("");

  console.log(`ROOM: ${roomId} -- HOUSE ${houseId}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomData = await getRoom(roomId, houseId);
        if (roomData) {
          console.log(roomData);
          setRoomName(roomData.name);
          Object.keys(roomData).forEach((key) => {
            setValue(key, roomData[key]);
          });
        }
        const existingPictures = await getRoomImages(roomId);
        setExistingPictures(existingPictures);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [roomId, houseId, setValue]);

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteRoomPicture(roomId, imageId);
      setExistingPictures(
        existingPictures.filter((picture) => picture.id !== imageId)
      );
    } catch (e) {
      console.error("Ошибка при удалении изображения:", e);
    }
  };

  const renderExistingImage = () =>
    existingPictures.map((picture) => (
      <div key={picture.id}>
        <img
          className="edit__image"
          src={"https://api.gelenrest.ru" + picture.url}
          alt="Room"
        />
        <button onClick={() => handleDeleteImage(picture.id)}>Удалить</button>
      </div>
    ));

  const clearField = (fieldName) => {
    setValue(fieldName, "");
  };

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files) {
      setPictures(files);
    }
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      try {
        const newRoomData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          newRoomData.append(key, value);
        });

        await updateRoom(houseId, roomId, newRoomData);
        if (pictures.length > 0) {
          await uploadRoomPictures(pictures, roomId);
        }
        console.log(`${data.name} updated!`);

        reset();
        setPictures([]);
        if (picturesInput.current) {
          picturesInput.current.value = null;
        }
        onEditSubmit();
      } catch (e) {
        console.log(e);
      }
    },
    [reset, pictures, houseId, roomId, onEditSubmit]
  );

  return (
    <div className="houses_form-add">
      <div>Изменить комнату {roomName}</div>
      <div className="edit__image-list">{renderExistingImage()}</div>
      <form
        className="windows__update-list--points"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {roomFields.map((field, index) => (
          <div className={`windows__update-list--point-1 windows__update-list--point ${field.type === 'checkbox' ? 'checkbox-class' : 'checkbox'}`} key={index}>
            <label>{field.label}</label>
            <input
              placeholder={field.label}
              type={field.type}
              name={field.name}
              {...register(field.name, { required: false })}
            />
            {errors[field.name] && <span>{field.error}</span>}
            <button type="button" onClick={() => clearField(field.name)}>
              Очистить
            </button>
          </div>
        ))}
        <div className="photo windows__update-list--point">
          <label>Фотографии комнаты</label>
          <input
            type="file"
            name="roomImages"
            accept="image/*"
            onChange={handleImageChange}
            ref={picturesInput}
            multiple
          />
        </div>
        <button className="save" type="submit">Сохранить комнату</button>
      </form>
    </div>
  );
}
