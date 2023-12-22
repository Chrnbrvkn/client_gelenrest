import { useForm } from "react-hook-form"
import { useState, useRef, useCallback, useEffect } from "react"
import { uploadApartPictures, getApart, updateApart, getApartImages, deleteApartPicture } from "../../../api/apartsApi"
import { apartFields } from "../../../constants/formFields"


export default function EditApart({ id, onEditSubmit }) {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm()
  const [pictures, setPictures] = useState([])
  const [existingPictures, setExistingPictures] = useState([])
  const picturesInput = useRef()
  const [apartName, setApartName] = useState('')
  const fetchApartData = useCallback(async (e) => {
    try {
      const apartData = await getApart(id)
      if (apartData) {
        setApartName(apartData.name)
        Object.keys(apartData).forEach(key => {
          setValue(key, apartData[key])
        })
      }
    } catch (e) {
      console.log(e);
    }
  }, [id, setValue])

  const fetchApartImages = async () => {
    try {
      const existingPictures = await getApartImages(id)
      console.log(existingPictures);
      setExistingPictures(existingPictures)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchApartData()
    fetchApartImages()
  }, [fetchApartData])

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteApartPicture(id, imageId);
      setExistingPictures(existingPictures.filter(picture => picture.id !== imageId));
    } catch (e) {
      console.error("Ошибка при удалении изображения:", e);
    }
  };
  const renderExistingImage = () => {
    return existingPictures.map(picture => (
      <div key={picture.id}>
        <img className="edit__image" src={'http://45.80.69.128:3000' + picture.url} />
        <button onClick={() => handleDeleteImage(picture.id)}>Удалить</button>
      </div>
    ))
  }
  const clearField = (fieldName) => {
    setValue(fieldName, '');
  };
  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files)
    if (files) {
      setPictures(files)
    }
  }, [])

  const onSubmit = useCallback(async (data) => {
    try {
      const newApartData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        newApartData.append(key, value)
      })

      await updateApart(id, newApartData)
      if (pictures.length > 0) {
        await uploadApartPictures(pictures, id)
      }
      console.log(`${data.name} updated!`);

      reset()
      setPictures([])
      if (picturesInput.current) {
        picturesInput.current.value = null
      }
      onEditSubmit()
    } catch (e) {
      console.log(e);
    }
  }, [reset, pictures, onEditSubmit])

  return (
    <div className="houses_form-add">
      <div>Изменить квартиру {apartName}</div>
      {renderExistingImage()}
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
            <button type="button" onClick={() => clearField(field.name)}>
              Очистить
            </button>
          </div>
        ))}
        <div className="windows__update-list--point-1 windows__update-list--point">
          <p>Фотографии квартиры</p>
          <input
            type="file"
            name='apartImages'
            accept="image/*"
            onChange={handleImageChange}
            ref={picturesInput}
            multiple
          />
        </div>
        <button type="submit" className="save">
          Сохранить квартиру
        </button>
      </form>
    </div>
  )
}