import { useState, useRef, useCallback, useEffect } from "react"
import { createApart, uploadApartPictures } from "../../../api/apartsApi.js"
import { useForm } from "react-hook-form"
import { apartFields } from "../../../constants/formFields.js"

export default function AddApartForm({ apartFormData, onChange, onApartAdded }) {
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm()
  const [pictures, setNewPictures] = useState([])
  const [pictureError, setPictureError] = useState(false);
  const picturesInput = useRef()

  // Функция для сохранения данных формы в sessionStorage
  const saveFormData = (data) => {
    sessionStorage.setItem('apartFormData', JSON.stringify(data))
  }
  // Отслеживание изменений в полях формы и сохранение их в sessionStorage
  useEffect(() => {
    const sub = watch(data => saveFormData(data))
    return () => sub.unsubscribe()
  }, [onChange, watch])
  // Загрузка сохраненных данных формы при монтировании компонента
  useEffect(() => {
    const savedForm = sessionStorage.getItem('apartFormData')
    if (apartFormData) {
      const formData = JSON.parse(savedForm)
      for (const key in formData) {
        setValue(key, formData[key])
      }
    }
  }, [apartFormData, setValue])

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
      const apartData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        apartData.append(key, value)
      })


      const createdApart = await createApart(apartData)
      await uploadApartPictures(pictures, createdApart.id)
      console.log(`${data.name} created!`);

      reset()
      setNewPictures([])
      if (picturesInput.current) {
        picturesInput.current.value = null
      }
      onApartAdded()
    } catch (e) {
      console.log(e);
    }
  }, [pictures, reset, onApartAdded]
  )

  return (
    <div className="houses_form-add">
      <form onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="windows__update-list--points">
        {apartFields.map((field, index) => (
          <div key={index}
            className="windows__update-list--point-1 windows__update-list--point">
            <p>{field.label}</p>
            <input
              placeholder={field.label}
              type={field.type}
              name={field.name}
              {...register(field.name, { required: true })}
            />
            {errors[field.name] && <p>{field.error}</p>}
          </div>
        ))}
        <div className="photo windows__update-list--point">
          <p>Фотографии квартиры</p>
          <input
            type="file"
            name='apartImages'
            accept="image/*"
            onChange={handleImageChange}
            ref={picturesInput}
            multiple
          />
          {pictureError && <p>Добавьте Фотографии квартиры</p>}
        </div>
        <button type="submit" className="save">
          Сохранить квартиру
        </button>
      </form>
    </div>
  )
}