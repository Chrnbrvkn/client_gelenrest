import React, { useCallback, useEffect } from 'react'
import '../assets/styles/modal.css'
import { useForm } from 'react-hook-form';
import { useApiData } from '../contexts/ApiProvider';
import { createBooking } from '../api/bookingApi';
import { bookingFields } from '../constants/formFields';



export default function ReserveForm({ closeModal, selectedItem }) {
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } = useForm();
  const { rooms, aparts, houses, isSubmitting, setIsSubmitting } = useApiData()

  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");





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


  console.log(selectedItem);

  useEffect(() => {
    if (selectedItem) {
      setValue("itemId", selectedItem.id);
      setValue("propertyType", selectedItem.type);
      setValue("propertyName", selectedItem.name);
      setValue("address", selectedItem.address);
      setValue("houseName", selectedItem.type === 'room' ? selectedItem.houseName : '');
      setValue("dailyRate", selectedItem.dailyRate);
      setValue("status", "PENDING");
      setValue("bookingDate", new Date().toISOString().slice(0, 10));


    }
  }, [selectedItem, setValue]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
      setValue("totalDays", totalDays > 0 ? totalDays : 0);

      const totalAmount = totalDays * selectedItem.dailyRate;
      setValue("totalAmount", totalAmount);
    }
  }, [checkInDate, checkOutDate, selectedItem, setValue]);

  const onSubmit = useCallback(async (data) => {
    try {
      console.log(data);
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
        {`Забронировать ${selectedItem.name}`}
      </p>
      <div className='modal__input'>
        <label htmlFor="phone">Дата заезда:</label>
        <input type="date" {...register("checkInDate", { required: true })} placeholder="Дата заезда" />
        {errors.checkInDate && <p>{errors.checkInDate.message}</p>}

        <label htmlFor="phone">Дата выезда:</label>
        <input type="date" {...register("checkOutDate", { required: true })} placeholder="Дата выезда" />
        {errors.checkOutDate && <p>{errors.checkOutDate.message}</p>}
      </div>
      <div className='modal__input'>
        <label htmlFor="name">Ваше имя:</label>
        <input {...register("guestName", { required: true })} placeholder="Имя" />
        {errors.guestName && <p>{errors.guestName.message}</p>}
      </div>
      <div className='modal__input'>
        <label htmlFor="phone">Телефон:</label>
        <input
          id="phone"
          onInput={handlePhoneInput}
          type="tel"
          placeholder="Номер телефона"
          {...register('guestContact', {
            required: 'Это поле обязательно',
            validate: validatePhone
          })}
        />
      </div>
      {errors.guestContact && <p className='modal__input-error'>{errors.guestContact.message || 'Телефон должен содержать ровно 11 цифр'}</p>}

      <div className='modal__input'>
        <label htmlFor="phone">Количество гостей:</label>
        <input {...register("guestsCount", { required: true })} placeholder="Количество гостей" type="number" />
        {errors.guestsCount && <p>{errors.guestsCount.message}</p>}
      </div>
      <button className='modal__submit' type="submit" >Отправить</button>
    </form>
  )
}
