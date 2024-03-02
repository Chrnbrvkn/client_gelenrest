import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useApiData } from '../contexts/ApiProvider';
import { createBooking } from '../api/bookingApi';
import { bookingFields } from '../constants/formFields';
import SelectedItemCalendar from './SelectedItemCalendar';
import { useModals } from '../contexts/ModalsProvider';
import ReserveFormAdditionally from './ReserveFormAdditionally';


export default function ReserveForm({ closeModal, selectedItem }) {
  const methods = useForm()
  const { checkInDate, checkOutDate, guestsCount, setCheckOutDate, setCheckInDate, setGuestsCount } = useModals()
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = methods;
  const { houses, setIsSubmitting, isSubmitting } = useApiData();
  const [showCalendar, setShowCalendar] = useState(false);

  const [totalAmount, setTotalAmount] = useState('');
  const guestsInputRef = useRef(null);

  const [optionalForm, setOptionalForm] = useState(false)
  useEffect(() => {
    if (selectedItem) {
      setValue("itemId", selectedItem.id);
      setValue("itemName", selectedItem.name);
      console.log(typeof selectedItem.price);
      setValue("dailyRate", selectedItem.price);
      setValue('checkInDate', checkInDate ? checkInDate.toISOString() : '');
      setValue('checkOutDate', checkOutDate ? checkOutDate.toISOString() : '');
      setValue('guestsCount', guestsCount);
      setValue("status", "ОЖИДАНИЕ");

      if (checkOutDate && checkInDate) {
        const totalCost = selectedItem.price * ((checkOutDate - checkInDate) / (24 * 3600000))
        console.log(totalCost);
        setValue('totalCost', totalCost)
      }

      if (selectedItem.houseId) {
        const house = houses.find(h => h.id === selectedItem.houseId)
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
  }, [checkInDate, checkOutDate, guestsCount, setValue, selectedItem]);

  ///////// CALENDAR

  const handleOpenCalendarForCheckIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowCalendar(true);
    setCheckInDate(null);
  };

  const handleOpenCalendarForCheckOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!checkInDate) {
      handleOpenCalendarForCheckIn();
    } else {
      setShowCalendar(true);
    }
  };

  const closeCalendar = () => setShowCalendar(false);


  const handleResetCheckOutDate = () => {
    setCheckOutDate(null);
    setValue('checkOutDate', '');
    setShowCalendar(true);
  };

  const handleResetCheckInDate = () => {
    setCheckInDate(null);
    setValue('checkInDate', '');

    setCheckOutDate(null);
    setValue('checkOutDate', '');
  };



  useEffect(() => {
    if (checkOutDate && guestsCount) {
      console.log('CHECK IN: ', checkInDate.toLocaleDateString());
      console.log('CHECK OUT: ', checkOutDate.toLocaleDateString());
      // guestsInputRef.current.focus();
    }

  }, [checkOutDate, guestsCount])

  ///////// CALENDAR


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
    <div className='modal__reserve_form'>
      <p className="modal__form-title">Забронировать {selectedItem.houseId ? `комнату ${selectedItem.name} в доме ${houses.find(h => h.id === selectedItem.houseId).name}` : selectedItem.name}</p>
      <p>{`Адрес: ${selectedItem.address || houses.find(h => h.id === selectedItem.houseId)?.address}`}</p>
      <p>{`Цена за сутки: ${selectedItem.price}`}</p>
      <p>{`Общая сумма: ${totalAmount}`}</p>
      <form className='modal__form' onSubmit={handleSubmit(onSubmit)}>

        {/* <p>10-19 суток скидка 5%
            Бонусы по телефону
            20-30 скидка 10%
            Бонусы при телефону
            Помесячно только по телефону</p> */}
        <div className="reserve__items">
          <div>
            <div className="selected__date"
              onClick={handleOpenCalendarForCheckIn}>
              {checkInDate ? checkInDate.toLocaleDateString() : 'Заезд'}
              {checkInDate && (
                <button onClick={handleResetCheckInDate}
                  className="date-reset-button">Х</button>
              )}
            </div>
          </div>
          <div>
            {checkInDate && (checkOutDate - checkInDate) < 3 * (24 * 3600 * 1000) && (
              <div>
                <p style={{ textAlign: "center" }}>от трёх дней</p>
              </div>
            )}
            <div className="selected__date"
              onClick={handleOpenCalendarForCheckOut}>
              {checkOutDate ? checkOutDate.toLocaleDateString() : 'Выезд'}
              {checkOutDate && (
                <button onClick={handleResetCheckOutDate}
                  className="date-reset-button">Х</button>
              )}
            </div>
          </div>
          <div className="guests__count">
            <label htmlFor="guestsCount">Количество гостей:</label>
            <input
              id="guestsCount"
              type="number"
              ref={guestsInputRef}
              value={guestsCount || ''}
              onChange={(e) => setGuestsCount(Math.max(1, e.target.value))}
              {...register('guestsCount', { required: true, min: 1 })}
            />
            {errors.guestsCount && <span>Это поле обязательно</span>}
          </div>
        </div>
        {showCalendar && (
          <SelectedItemCalendar
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            onClose={closeCalendar}
            selectedItem={selectedItem}
          />
        )}
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
        {/* <button onClick={() => setOptionalForm(prev => !prev)}>Дополнительные услуги</button>
        {optionalForm && (

          <ReserveFormAdditionally />
        )} */}
        <button className='modal__submit' type="submit" disabled={isSubmitting}>Отправить заявку</button>
      </form>
    </div>
  );
}
