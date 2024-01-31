import { useForm } from "react-hook-form"
import { useState, useCallback, useEffect } from "react"
import { getOneBooking } from "../../../api/bookingApi"
import { bookingFields } from "../../../constants/formFields"
import {useApiData} from "../../../contexts/ApiProvider"



export default function EditBooking({ id, onEditSubmit }) {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm()
  const { updateBookingData } = useApiData();
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

  const onSubmit = async (data) => {
    await updateBookingData(id, data);
    reset();
    onEditSubmit(); // Сообщить родительскому компоненту об успешном обновлении
  };

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
                {...register(field.name, { required: false})}
              />
            ) : (
              <select name={field.name} {...register(field.name, { required: true })}>
                <option value="">Выберите...</option>
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            {errors[field.name] && <p className="error-message">{errors[field.name]?.message}</p>}
            <button type="button" onClick={() => clearField(field.name)}>Очистить</button>
          </div>
        ))}
        <button type="submit" className="save">Сохранить бронь</button>
      </form>
    </div>
  );
}
