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
    if (selectedItem) {

      setValue('itemId', selectedItem.id);
      setValue('itemName', selectedItem.name);
      setValue('dailyRate', selectedItem.price);

      if (selectedItem.houseId) {
        const house = houses.find(h => h.id === selectedItem.houseId);
        if (house) {
          setValue('itemType', 'room');
          setValue('houseName', house.name);
          setValue('address', house.address);
        }
      } else {
        setValue('itemType', 'apart');
        setValue('houseName', '');
        setValue('address', selectedItem.address);
      }
    }
  }, [selectedItem, houses, watch, setValue]);

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
      <p>{!selectedItem.houseId ? `Название квартиры: ${selectedItem.name}`
        : `Название дома: ${houses.find(h => selectedItem.houseId === h.id).name}, название комнаты: ${selectedItem.name}`}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="windows__update-list--points">

        <div className="windows__update-list--point-1 windows__update-list--point">
          <p>Дата заезда</p>
          <input
            placeholder='Дата заезда'
            type='date'
            {...register('checkInDate', { required: true })}
          />
          {errors['checkInDate'] && <p>"Выберите дату заезда"</p>}
        </div>

        <div className="windows__update-list--point-1 windows__update-list--point">
          <p>Дата выезда</p>
          <input
            placeholder='Дата выезда'
            type='date'
            {...register('checkOutDate', { required: true })}
          />
          {errors['checkOutDate'] && <p>"Выберите дату выезда"</p>}
        </div>
        
        {bookingFields
          .filter(field => !['checkInDate', 'checkOutDate', 'itemId', 'itemType', 'itemName', 'address', 'houseName', 'dailyRate', 'totalAmount', 'totalDays', 'bookingDate']
            .includes(field.name)).map((field, index) => {
              return field.type === 'select' ? (
                <div key="status" className="windows__update-list--point-1 windows__update-list--point">
                  <p>Статус бронирования</p>
                  <select {...register("status", { required: true })}>
                    <option value="">Выберите статус...</option>
                    {["ОЖИДАЕТСЯ", "ПОДТВЕРЖДЁН", "ОТМЕНЁН"].map(status => (
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