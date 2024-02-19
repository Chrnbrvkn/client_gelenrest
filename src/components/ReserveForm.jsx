import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApiData } from '../contexts/ApiProvider';
import { createBooking } from '../api/bookingApi';
import { bookingFields } from '../constants/formFields';
import SelectedItemCalendar from './SelectedItemCalendar';
import { useModals } from '../contexts/ModalsProvider';


export default function ReserveForm({ closeModal, selectedItem }) {
  const {checkInDate,checkOutDate, guestsCount, setGuestsCount} = useModals()
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const { houses, setIsSubmitting, isSubmitting } = useApiData();
  const [totalAmount, setTotalAmount] = useState('');
  // const checkInDate = watch("checkInDate");
  // const checkOutDate = watch("checkOutDate");

  useEffect(() => {
    if (selectedItem) {
      setValue("itemId", selectedItem.id);
      setValue("propertyType", selectedItem.houseId ? 'room' : 'apart');
      setValue("propertyName", selectedItem.name);
      setValue("address", selectedItem.address);
      setValue("houseName", selectedItem.houseId ? houses.find(h => h.id === selectedItem.houseId)?.name : '');
      setValue("dailyRate", selectedItem.price);
      setValue("status", "ОЖИДАНИЕ");
      setValue("bookingDate", new Date().toISOString().slice(0, 10));
    }
  }, [selectedItem, setValue, houses]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const calculatedTotalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

      if (calculatedTotalDays > 0) {
        setValue("totalDays", calculatedTotalDays);
        const calculatedTotalAmount = calculatedTotalDays * selectedItem.price;
        setTotalAmount(calculatedTotalAmount);
      }
    }
  }, [checkInDate, checkOutDate, selectedItem.price, setValue]);

  const handlePhoneInput = (event) => {
    const input = event.target.value;
    const formattedInput = input.replace(/[^\d+()-]/g, ''); 
    setValue('guestContact', formattedInput);
  };

  const validatePhone = (input) => /^[+\d]{1}[\d\-\(\) ]{10,14}$/i.test(input);

  const onSubmit = async (data) => {
    const bookingData = {
      ...data,
      totalAmount,
    };

    try {
      console.log(bookingData);
      setIsSubmitting(true);
      await createBooking(JSON.stringify(bookingData));
      reset();
      closeModal();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <p className="modal__form-title">{`Забронировать ${selectedItem.name}`}</p>
      <p>{`Адрес: ${selectedItem.address || houses.find(h => h.id === selectedItem.houseId)?.address}`}</p>
      <p>{`Цена за сутки: ${selectedItem.price}`}</p>
      <p>{`Общая сумма: ${totalAmount}`}</p>
      <form className='modal__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='modal__input'>
          <label htmlFor="checkInDate">Дата заезда:</label>
          <input type="date" {...register("checkInDate", { required: "Дата заезда обязательна" })} />
          {errors.checkInDate && <p className='modal__input-error'>{errors.checkInDate.message}</p>}

          <label htmlFor="checkOutDate">Дата выезда:</label>
          <input type="date" {...register("checkOutDate", { required: "Дата выезда обязательна" })} />
          {errors.checkOutDate && <p className='modal__input-error'>{errors.checkOutDate.message}</p>}
        </div>
        <div className='modal__input'>
          <label htmlFor="guestName">Ваше имя:</label>
          <input {...register("guestName", { required: "Имя обязательно" })} placeholder="Имя" />
          {errors.guestName && <p className='modal__input-error'>{errors.guestName.message}</p>}
        </div>

        <div className='modal__input'>
          <label htmlFor="guestContact">Телефон:</label>
          <input
            type="tel"
            {...register('guestContact', {
              required: "Телефон обязателен",
              validate: validatePhone
            })}
            onInput={handlePhoneInput}
            placeholder="Номер телефона"
          />
          {errors.guestContact && <p className='modal__input-error'>{errors.guestContact.message || "Неверный формат номера телефона"}</p>}
        </div>
        <div className='modal__input'>
          <label htmlFor="guestsCount">Количество гостей:</label>
          <input type="number" {...register("guestsCount", { required: "Количество гостей обязательно" })} placeholder="Количество гостей" />
          {errors.guestsCount && <p className='modal__input-error'>{errors.guestsCount.message}</p>}
        </div>

        <button className='modal__submit' type="submit" disabled={isSubmitting}>Отправить заявку</button>
      </form>
    </>
  );
}
