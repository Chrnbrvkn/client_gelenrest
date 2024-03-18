import { useState, useRef, useCallback, useEffect } from "react"
import { createRoom, uploadRoomPictures } from "../../../api/roomsApi"
import { useForm } from 'react-hook-form';
import '../admin.css'
import { roomFields } from "../../../constants/formFields";
import { useApiData } from "../../../contexts/ApiProvider";

export default function AddRoomForm({ currentHouse, selectedHouseId, roomFormData, onChange, onToggleRoomForm }) {
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm();

  const [pictures, setNewPictures] = useState([])
  const [pictureError, setPictureError] = useState(false);
  const picturesInput = useRef()

  const { fetchDataRooms } = useApiData()
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveFormData = (data) => {
    sessionStorage.setItem('roomFormData', JSON.stringify(data))
  }

  useEffect(() => {
    const sub = watch(data => saveFormData(data))
    return () => sub.unsubscribe()
  }, [onChange, watch])

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

      if (isSubmitting) return;
      setIsSubmitting(true);

      if (pictures.length === 0) {
        setPictureError(true);
      }

      const roomData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        roomData.append(key, value)
      })

      roomData.append('houseId', selectedHouseId)
      const createdRoom = await createRoom(selectedHouseId, roomData)
      if (pictures.length > 0) {
        await uploadRoomPictures(pictures, createdRoom.id)
      }


    } catch (e) {
      console.log(e);
    } finally {
      if (picturesInput.current) {
        picturesInput.current.value = null
      }
      reset()
      setNewPictures([])
      setIsSubmitting(true);
      fetchDataRooms()
      onToggleRoomForm()
    }
  }, [pictures, reset])

  return (
    <div className="houses_form-add">
      <div>Добавьте комнату в {currentHouse.name}</div>
      <form onSubmit={handleSubmit(onSubmit)}
        className="windows__update-list--points">

        {roomFields.map((field, index) => {

          if (field.type === 'select') {
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
            )
          }
          if (field.type === 'checkbox') {
            return (
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
            )
          } else {
            return (
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
            )
          }
        })}

        <div className="photo windows__update-list--point button">
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
        {isSubmitting ? "Добавление..." : "Добавить комнату"}
        </button>
      </form>
    </div>
  )
}