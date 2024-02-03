import { useState, useRef, useCallback, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { createHouse, uploadHousePictures } from "../../../api/housesApi"
import { houseFields } from "../../../constants/formFields"

export default function AddHouseForm({ houseFormData, onChange, onHouseAdded }) {
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm()
  const [pictures, setNewPictures] = useState([])
  const [pictureError, setPictureError] = useState(false);
  const picturesInput = useRef()

  // Функция для сохранения данных формы в sessionStorage
  const saveFormData = (data) => {
    sessionStorage.setItem('houseFormData', JSON.stringify(data))
  }
  // Отслеживание изменений в полях формы и сохранение их в sessionStorage
  useEffect(() => {
    const sub = watch(data => saveFormData(data))
    return () => sub.unsubscribe()
  }, [watch, onChange])
  // Загрузка сохраненных данных формы при монтировании компонента
  useEffect(() => {
    const savedForm = sessionStorage.getItem('houseFormData')
    if (houseFormData) {
      const formData = JSON.parse(savedForm)
      for (const key in formData) {
        setValue(key, formData[key])
      }
    }
  }, [houseFormData, setValue])


  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files)
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

      const houseData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        houseData.append(key, value)
      })

      const createdHouse = await createHouse(houseData)
      await uploadHousePictures(pictures, createdHouse.id)
      console.log(`${data.name} created!`);

      reset()
      setNewPictures([])
      if (picturesInput.current) {
        picturesInput.current.value = null
      }
      onHouseAdded()
    } catch (e) {
      console.log(e);
    }
  }, [pictures, reset, onHouseAdded])

  return (
    <div className="houses_form-add">
      <form onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="windows__update-list--points">
        {houseFields.map((field, index) => (
          <div key={index} className="windows__update-list--point-1 windows__update-list--point">
            <p>{field.label}</p>
            <input
              placeholder={field.label}
              type={field.type}
              name={field.name}
              {...register(field.name, { required: false })}
            />
            {errors[field.name] && <p>{field.error}</p>}
          </div>
        ))}
        <div className="photo windows__update-list--point">
          <p>Фотографии дома</p>
          <input
            type="file"
            name="houseImages"
            accept="image/*"
            onChange={handleImageChange}
            ref={picturesInput}
            multiple
          />
        </div>
        {pictureError && <p>Добавьте Фотографии дома</p>}
        <button className="save">
          Сохранить дом
        </button>
      </form>
    </div>
  )
}