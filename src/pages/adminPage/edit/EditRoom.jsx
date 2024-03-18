import { useForm } from "react-hook-form";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  getRoom,
  updateRoom,
  getRoomImages,
  uploadRoomPictures,
  deleteRoomPicture,
} from "../../../api/roomsApi.js";
import { roomFields } from "../../../constants/formFields.js";

import { useApiData } from '../../../contexts/ApiProvider.jsx'

export default function EditRoom({ houseId, roomId, onEditSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [pictures, setPictures] = useState([]);
  const [currentPictures, setCurrentPictures] = useState([]);
  const picturesInput = useRef();
  // const [roomName, setRoomName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentRoom, setCurrentRoom] = useState({})
  const { houses, rooms, roomsPictures, fetchDataRooms } = useApiData()



  useEffect(() => {

    const fetchCurrentRoom = () => {
      try {
        const room = rooms.find(r => (r.houseId === houseId && r.id === roomId))
        setCurrentRoom(room)
        Object.keys(room).forEach((key) => {
          setValue(key, room[key]);
        });
        const roomPictures = roomsPictures.filter((p => p.id !== roomId))
        setCurrentPictures(roomPictures)
      } catch (e) {
        console.log(e);
      }

    }
    fetchCurrentRoom()

    // const fetchData = async () => {
    //   try {
    //     const roomData = await getRoom(roomId, houseId);
    //     if (roomData) {
    //       console.log(roomData);
    //       setRoomName(roomData.name);
    //       Object.keys(roomData).forEach((key) => {
    //         setValue(key, roomData[key]);
    //       });
    //     }
    //     const currentPictures = await getRoomImages(roomId);
    //     setCurrentPictures(currentPictures);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    // fetchData();
  }, [roomId, houseId, setValue]);

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteRoomPicture(roomId, imageId);
    } catch (e) {
      console.error("Ошибка при удалении изображения:", e);
    }
  };

  const renderExistingImage = () =>
    currentPictures.map((picture) => (
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
        if (isSubmitting) return;
        setIsSubmitting(true);

        const newRoomData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          newRoomData.append(key, value);
        });

        await updateRoom(houseId, roomId, newRoomData);
        if (pictures.length > 0) {
          await uploadRoomPictures(pictures, roomId);
        }
        console.log(`${data.name} updated!`);


      } catch (e) {
        console.log(e);
      } finally {
        if (picturesInput.current) {
          picturesInput.current.value = null;
        }
        reset();
        setPictures([]);
        setIsSubmitting(true);
        onEditSubmit();
        fetchDataRooms()
      }
    },
    [reset, pictures, houseId, roomId, onEditSubmit, isSubmitting]
  );

  return (
    <div className="houses_form-add">
      <div>Изменить комнату {currentRoom.name}</div>
      <div className="edit__image-list">{renderExistingImage()}</div>
      <form
        className="windows__update-list--points"
        onSubmit={handleSubmit(onSubmit)}
      >
        {roomFields.map((field, index) => (
          <div key={index}
            className={`windows__update-list--point-1 windows__update-list--point ${field.type === 'checkbox' ? 'checkbox' : ''}`}>
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
