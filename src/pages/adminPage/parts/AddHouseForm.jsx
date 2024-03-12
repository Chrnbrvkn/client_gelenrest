import { useState, useRef, useCallback, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { createHouse, uploadHousePictures } from "../../../api/housesApi"
import { houseFields } from "../../../constants/formFields"
import { useApiData } from "../../../contexts/ApiProvider"

export default function AddHouseForm({ houseFormData, onChange, onHouseAdded, onToggleHouseForm }) {
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm()
  const [pictures, setNewPictures] = useState([])
  const [pictureError, setPictureError] = useState(false);
  const picturesInput = useRef()

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchDataHouses } = useApiData()

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
      if (isSubmitting) return;
      setIsSubmitting(true);

      if (pictures.length === 0) {
        setPictureError(true);
      }

      const houseData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        houseData.append(key, value)
      })
      console.log(`DATA: ${data}`);

      const createdHouse = await createHouse(houseData)
      if (pictures.length > 0) {
        const responseUpload = await uploadHousePictures(pictures, createdHouse.id)
        console.log(`RESPONSE UPLOAD: ${JSON.stringify(responseUpload)}`);
      }

      console.log(`createdHouse: ${JSON.stringify(createdHouse)}`);
      reset()
      setNewPictures([])
      if (picturesInput.current) {
        picturesInput.current.value = null
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(true);
      fetchDataHouses()
      onHouseAdded()
      onToggleHouseForm()
    }
  }, [pictures, reset, onHouseAdded])

  return (
    <div className="houses_form-add">
      <form onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="windows__update-list--points">
        {houseFields.map((field, index) => {
          if (field.type !== "select") {
            return (
              <div key={index} className={`windows__update-list--point`}>
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
          {isSubmitting ? "Сохранение..." : "Сохранить дом"}
        </button>
      </form>
    </div>
  )
}