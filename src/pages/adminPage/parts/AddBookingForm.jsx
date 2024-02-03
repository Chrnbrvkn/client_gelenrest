import { useState, useRef, useCallback, useEffect } from "react"
import { createBooking } from "../../../api/bookingApi"
import { useForm } from "react-hook-form"
import { bookingFields } from "../../../constants/formFields"
import { useAdmin } from "../../../contexts/AdminProvider"


export default function AddBookingForm({
  bookingFormData, onChange, onBookingAdded
}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { selectedItem } = useAdmin()

  const onSubmit = useCallback(async (data) => {
    try {
      console.log("Original form data:", data);

      if (selectedItem) {
        console.log("Selected item:", selectedItem);
        data.itemId = selectedItem.itemId;
        data.itemType = selectedItem.itemType;
      }
      console.log("Data to be sent:", data);
      await createBooking(JSON.stringify(data));
      reset();
      onBookingAdded();
    } catch (e) {
      console.error(e)
    }
  }, [reset, onBookingAdded])


  return (
    <div className="houses_form-add">
      <form onSubmit={handleSubmit(onSubmit)} className="windows__update-list--points">
        {bookingFields
          .filter(field => field.name !== 'itemId' && 
          field.name !== 'itemType' )
          .map((field, index) => (
            <div key={index} className="windows__update-list--point-1 windows__update-list--point">
              <p>{field.label}</p>
              {field.type !== 'select' ? (
                <input
                  placeholder={field.label}
                  type={field.type}
                  name={field.name}
                  {...register(field.name, { required: true })}
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
            </div>
          ))}
        <button type="submit" className="save">Добавить бронь</button>
      </form>
    </div>
  );
}