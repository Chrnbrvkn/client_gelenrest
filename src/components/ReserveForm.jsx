import React, { useCallback, useEffect } from 'react'
import '../assets/styles/modal.css'
import { useForm } from 'react-hook-form';
import { useApiData } from '../contexts/ApiProvider';
import { createBooking } from '../api/bookingApi';
import { bookingFields } from '../constants/formFields';



export default function ReserveForm({ closeModal, selectedItem }) {
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } = useForm();
  const { rooms, aparts, houses, isSubmitting, setIsSubmitting } = useApiData()


  console.log(selectedItem);



  const handlePhoneInput = (event) => {
    const input = event.target.value;
    const lastChar = input[input.length - 1] || ''
    const validator = /^[0-9+\-() ]*$/
    if (validator.test(lastChar) || input === '') {
      setValue('phone', input, { shouldValidate: true });
    } else {
      setValue('phone', getValues('phone'), { shouldValidate: true })
    }
  };

  const validatePhone = (input) => {
    const numDigits = input.match(/\d/g)?.length || 0;
    return numDigits >= 10 && numDigits <= 11;
  };



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
      closeModal()
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, setIsSubmitting, reset]);



  return (
    <form className='modal__form' onSubmit={handleSubmit(onSubmit)}>
      <p className="modal__form-title">
        Заказать обратный звонок
      </p>
      <div className='modal__input'>
        <label htmlFor="name">Ваше имя:</label>
        <input id="name"
          placeholder='Не обязательно'
          {...register('name', { required: false })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className='modal__input'>
        <label htmlFor="phone">Телефон:</label>
        <input
          id="phone"
          onInput={handlePhoneInput}
          type="tel"
          {...register('phone', {
            required: 'Это поле обязательно',
            validate: validatePhone
          })}
        />
      </div>
      {errors.phone && <p className='modal__input-error'>{errors.phone.message || 'Телефон должен содержать ровно 11 цифр'}</p>}
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
      <button className='modal__submit' type="submit" >Отправить</button>
    </form>
  )
}
