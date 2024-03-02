import { useState, useRef, useCallback, useEffect } from "react"
import { createRoom, uploadRoomPictures } from "../../../api/roomsApi"
import { useForm } from 'react-hook-form';
import '../admin.css'
import { roomFields } from "../../../constants/formFields";

export default function AddRoomForm({ houseName,selectedHouseId, roomFormData, onChange, onRoomAdded }) {
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm();

  const [pictures, setNewPictures] = useState([])
  const [pictureError, setPictureError] = useState(false);
  const picturesInput = useRef()

  // Функция для сохранения данных формы в sessionStorage
  const saveFormData = (data) => {
    sessionStorage.setItem('roomFormData', JSON.stringify(data))
  }
  // Отслеживание изменений в полях формы и сохранение их в sessionStorage
  useEffect(() => {
    const sub = watch(data => saveFormData(data))
    return () => sub.unsubscribe()
  }, [onChange, watch])
  // Загрузка сохраненных данных формы при монтировании компонента
  useEffect(() => {
    const savedForm = sessionStorage.getItem('roomFormData')
    if (roomFormData) {
      const formData = JSON.parse(savedForm)
      for (const key in formData) {
        setValue(key, formData[key])
      }
    }
  }, [setValue])

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setPictureError(false);
    }
    setNewPictures(files)
  }, [])

  const onSubmit = useCallback(async (data) => {
    try {
      if (pictures.length === 0) {
        setPictureError(true);
        return;
      }
      const roomData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        roomData.append(key, value)
      })
      roomData.append('houseId', selectedHouseId)
      const createdRoom = await createRoom(selectedHouseId, roomData)
      await uploadRoomPictures(pictures, createdRoom.id)
      console.log(`${data.name} created!`);

      reset()
      setNewPictures([])
      if (picturesInput.current) {
        picturesInput.current.value = null
      }
      // onRoomAdded()
    } catch (e) {
      console.log(e);
    }
  }, [pictures, reset])

  return (
    <div className="houses_form-add">
    <div>Добавьте комнату в {houseName}</div>
      <form onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="windows__update-list--points">
        {roomFields.map((field, index) => (
          <div key={index}
            className="windows__update-list--point-1 windows__update-list--point">
            <p>{field.label}</p>
            <input
              placeholder={field.label}
              type={field.type}
              name={field.name}
              {...register(field.name, { required: field.requare })}
            />
            {errors[field.name] && <p>{field.error}</p>}
          </div>
        ))}
        <div className="photo windows__update-list--point">
          <p>Фотографии комнаты</p>
          <input
            type="file"
            name="roomImages"
            accept="image/*"
            onChange={handleImageChange}
            ref={picturesInput}
            multiple
          />
        </div>
        {pictureError && <p>Добавьте хотя бы одну картинку.</p>}
        <button type="submit" className="save">
          Сохранить комнату
        </button>
      </form>
    </div>
  )
}