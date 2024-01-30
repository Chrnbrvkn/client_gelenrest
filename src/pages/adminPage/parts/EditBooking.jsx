import { useForm } from "react-hook-form"
import { useState, useRef, useCallback, useEffect } from "react"
import { getOneBooking, updateBooking } from "../../../api/bookingApi"
import { bookingFields } from "../../../constants/formFields"



export default function EditBooking({ bookingType, id, onEditSubmit }) {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm()
  const [booking, setBooking] = useState([])
  const [bookingNumber, setBookingNumber] = useState('')

  const fetchBookingData = useCallback(async () => {
    try {
      const bookingData = await getOneBooking(id)
      if (bookingData) {
        setBookingNumber(id)
        Object.keys(bookingData).forEach(key => {
          setValue(key, bookingData[key])
        })
      }
    } catch (e) {
      console.error(e)
    }
  }, [id, setValue])

  useEffect(() => {
    fetchBookingData()
  }, [fetchBookingData])

  const clearField = (fieldName) => {
    setValue(fieldName, '')
  }

  const onSubmit = useCallback(async (data) => {
    try {
      const newBookingData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        newBookingData.append(key, value)
      })

      await updateBooking(id)
      reset()
      onEditSubmit()
    } catch (e) {
      console.error(e)
    }
  }, [reset, onEditSubmit])

  return (
    <div className="houses_form-add">
      <div>Изменить бронь номер: {bookingNumber}</div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/formdata" className="windwos__update-list--points">
        {bookingFields.map((field, index) => (
          <div key={index} className="windows__update-list--point-1  windows__update-list--point">
            <label>{field.label}</label>
            {field.type !== 'select' ? (
              <input
                placeholder={field.label}
                type={field.type}
                name={field.name}
                {...register(field.name, { required: field.type === 'select' ? false : true })}
              />
            ) : (
              <select name={field.name} {...register(field.name, { required: true })}>
                <option value="">Выберите...</option>
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            {errors[field.name] && <p>{field.error}</p>}
            <button type="button" onClick={() => clearField(field.name)}>Очистить</button>
          </div>
        ))}
        <button type="submit" className="save">Сохранить бронь</button>
      </form>
    </div>
  );
}
