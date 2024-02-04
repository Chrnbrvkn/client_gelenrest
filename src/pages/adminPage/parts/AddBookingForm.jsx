import { useState, useRef, useCallback, useEffect } from "react"
import { createBooking } from "../../../api/bookingApi"
import { useForm } from "react-hook-form"
import { bookingFields } from "../../../constants/formFields"
import { useAdmin } from "../../../contexts/AdminProvider"
import { useApiData } from "../../../contexts/ApiProvider"


export default function AddBookingForm() {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm()
  const { selectedItem, setViewState } = useAdmin()
  const { rooms, aparts, houses, isSubmitting, setIsSubmitting } = useApiData()


  useEffect(() => {
    if (selectedItem && selectedItem.houseId) {
      console.log(selectedItem);
      const house = houses.find((h) => h.id === selectedItem.houseId);
      if (house) {
        setValue('propertyType', 'room');
        setValue('houseName', house.name);
        setValue('address', house.address);
      }
    } else {
      console.log(selectedItem);
      setValue('propertyType', 'apart');
      setValue('houseName', '');
      setValue('address', selectedItem.address);
    }
  }, [selectedItem, houses, setValue]);

  useEffect(() => {
    const checkIn = watch("checkInDate");
    const checkOut = watch("checkOutDate");

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const totalDays = (checkOutDate - checkInDate) / (1000 * 3600 * 24);

      if (totalDays > 0) {
        setValue("totalDays", totalDays);
        setValue("bookingDate", new Date().toISOString().slice(0, 10));
        setValue('propertyName', selectedItem.name);
        setValue('dailyRate', selectedItem.price);
      }
    }
  }, [watch, setValue]);

  const onSubmit = useCallback(async (data) => {
    try {
      if (isSubmitting) return;
      setIsSubmitting(true);

      await createBooking(JSON.stringify(data));
      reset();
      setViewState('none')
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, setIsSubmitting, reset]);


  return (
    <div className="houses_form-add">
      <form onSubmit={handleSubmit(onSubmit)} className="windows__update-list--points">
        {bookingFields
          .filter(field => !['itemId', 'propertyType', 'propertyName', 'address', 'houseName', 'dailyRate', 'totalAmount', 'totalDays', 'bookingDate']
            .includes(field.name)).map((field, index) => {
              return field.type === 'select' ? (
                <div key="status" className="windows__update-list--point-1 windows__update-list--point">
                  <p>Статус бронирования</p>
                  <select {...register("status", { required: true })}>
                    <option value="">Выберите статус...</option>
                    {["PENDING", "CONFIRMED", "CANCELLED"].map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  {errors.status && <p>{errors.status.message}</p>}
                </div>
              ) : (
                <div key={index} className="windows__update-list--point-1 windows__update-list--point">
                  <p>{field.label}</p>
                  <input
                    placeholder={field.label}
                    type={field.type}
                    {...register(field.name, { required: true })}
                  />
                  {errors[field.name] && <p>{field.error}</p>}
                </div>
              );
            })}
        <button type="submit" className="save">Добавить бронь</button>
      </form>
    </div>
  );
}