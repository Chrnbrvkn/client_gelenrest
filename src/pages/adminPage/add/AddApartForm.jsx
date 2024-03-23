import { useState, useRef, useCallback, useEffect } from "react"
import { createApart, uploadApartPictures } from "../../../api/apartsApi.js"
import { useForm } from "react-hook-form"
import { apartFields } from "../../../constants/formFields.js"
import { useApiData } from "../../../contexts/ApiProvider.jsx"
// import { shouldProcessLinkClick } from "react-router-dom/dist/dom.js"
// import { version } from "react"



export default function AddApartForm({ apartFormData, onChange, onApartAdded, onToggleApartForm }) {
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm()
  const [pictures, setNewPictures] = useState([])
  const [pictureError, setPictureError] = useState(false);
  const picturesInput = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchDataAparts } = useApiData()


  const saveFormData = (data) => {
    sessionStorage.setItem('apartFormData', JSON.stringify(data))
  }


  useEffect(() => {
    const sub = watch(data => saveFormData(data))
    return () => sub.unsubscribe()
  }, [watch])


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
      if (isSubmitting) return;
      setIsSubmitting(true);

      if (pictures.length === 0) {
        setPictureError(true);
      }

      const apartData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        apartData.append(key, value)
      })

      const createdApart = await createApart(apartData)
      if (pictures.length > 0) {
        await uploadApartPictures(pictures, createdApart.id);
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
      fetchDataAparts()
    }
  }, [pictures, isSubmitting, setIsSubmitting, reset]
  )

  return (
    <div className="houses_form-add">
      <form onSubmit={handleSubmit(onSubmit)}
        className="windows__update-list--points">
        {apartFields.map((field, index) => {

          if (field.name === "price") {
            return (
              <div key={index} className={`windows__update-list--point`}>
                <label>{field.label}</label>
                <input
                  placeholder={field.label}
                  type={field.type}
                  {...register(field.name, { required: field.requare })}
                  min={0}
                  step='00.1'
                />
                {errors[field.name] && <p>{field.error}</p>}
              </div>
            );
          }

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
          }

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
        })}

        <div className="photo windows__update-list--point button">
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
        <button type="submit" className="save" disabled={isSubmitting}>
          {isSubmitting ? "Добавление..." : "Добавить квартиру"}
        </button>
      </form>
    </div>
  )
}