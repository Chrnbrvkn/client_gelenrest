import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useApiData } from "../../../contexts/ApiProvider";
// import { createBooking } from '../api/bookingApi';
import { bookingFields } from "../../../constants/formFields";
import SelectedItemCalendar from "../../../components/SelectedItemCalendar";
import { useModals } from "../../../contexts/ModalsProvider";
import ReserveFormAdditionally from "../../../components/ReserveFormAdditionally";

import { useDispatch, useSelector } from "react-redux";

import { fetchClientBooking } from "../../../store/features/lists/clientBooking/clientBookingFetch";
import Calendar from "../../../components/Calendar";
import { setNotification } from "../../../store/features/notification/notificationSlice";
import { createBookingAsync } from "../../../store/features/lists/booking/bookingFetch";
import { useReserveDate } from "src/widgets/ReserveDate";
import { useReserveGuestsCount } from "src/widgets/ReserveDate";
import ReserveBar from "../../ReserveDate/ui/ReserveBar";
import { useReserveForm } from "src/widgets/ReserveModal";

export default function ReserveForm({ closeModal, selectedItem }) {
  const {
    showCalendar,
    setShowCalendar,
    handleOpenCalendarForCheckIn,
    handleOpenCalendarForCheckOut,
    handleFilterSelected,
    handleResetInDate,
    handleResetOutDate,
  } = useReserveDate();

  const { handleGuestsCountChange, handleKeyDown } = useReserveGuestsCount();
  const { handlePhoneInput, validatePhone } = useReserveForm();

  const { checkInDate, checkOutDate, guestsCount } = useSelector(
    (state) => state.reserve
  );

  const dispatch = useDispatch();
  const guestsInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [totalAmount, setTotalAmount] = useState("");

  const booking = useSelector((state) => state.clientBooking.data);
  const houses = useSelector((state) => state.houses.data);

  useEffect(() => {
    if (checkOutDate && guestsInputRef.current) {
      guestsInputRef.current.focus();
    }
    setValue("guestsCount", guestsCount);
  }, [checkOutDate, guestsCount]);

  useEffect(() => {
    if (selectedItem) {
      setValue("itemId", selectedItem.id);
      setValue("itemName", selectedItem.name);
      setValue("dailyRate", selectedItem.price);
      setValue("checkInDate", checkInDate ? checkInDate : "");
      setValue("checkOutDate", checkOutDate ? checkOutDate : "");
      setValue("guestsCount", guestsCount);
      setValue("status", "В ожидании");

      if (checkOutDate && checkInDate) {
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        const totalCost =
          selectedItem.price * ((endDate - startDate) / (24 * 3600000));
        console.log(totalCost);
        setValue("totalCost", totalCost);
      }

      if (selectedItem.houseId) {
        const house = houses.find((h) => h.id === selectedItem.houseId);
        if (house) {
          setValue("itemType", "room");
          setValue("roomId", selectedItem.id);
          setValue("houseName", house.name);
          setValue("address", house.address);
        }
      } else {
        setValue("itemType", "apart");
        setValue("apartId", selectedItem.id);
        setValue("houseName", "");
        setValue("address", selectedItem.address);
      }
    }
  }, [checkInDate, checkOutDate, guestsCount, setValue, selectedItem]);

  useEffect(() => {
    if (checkOutDate && guestsCount) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      console.log("CHECK IN: ", startDate.toLocaleDateString());
      console.log("CHECK OUT: ", endDate.toLocaleDateString());
      // guestsInputRef.current.focus();
    }
  }, [checkOutDate, guestsCount]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const calculatedTotalDays = Math.round(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      );

      if (calculatedTotalDays > 0) {
        setValue("totaldays", calculatedTotalDays);
        const calculatedTotalAmount = calculatedTotalDays * selectedItem.price;
        setTotalAmount(calculatedTotalAmount);
      }
    }
  }, [checkInDate, checkOutDate, selectedItem.price, setValue]);

  // const handlePhoneInput = (event) => {
  //   const input = event.target.value;
  //   const formattedInput = input.replace(/[^\d+()-]/g, "");
  //   setValue("guestContact", formattedInput);
  // };

  // const validatePhone = (input) => /^[+\d]{1}[\d\-\(\) ]{10,14}$/i.test(input);

  const onSubmit = async (data) => {
    const bookingData = {
      ...data,
      totalAmount,
      guestsCount: Number(guestsCount),
    };

    try {
      console.log("bookingData: ");
      console.log(bookingData);
      // setIsSubmitting(true);
      createBookingAsync(bookingData);
      dispatch(
        setNotification({
          message:
            "Заявка отправлена, мы свяжемся с вами в течении рабочего дня.",
          type: "success",
        })
      );
      reset();
      closeModal();
    } catch (e) {
      console.error(e);
      dispatch(
        setNotification({
          message: `Ошибка при отправке заявки, если она повторяется, свяжитесь с нами по телефону: 89242122377. 
        ${e.message}`,
          type: "error",
        })
      );
    } finally {
      // setIsSubmitting(false);
    }
  };

  return (
    <div className="modal__reserve_form">
      <p className="modal__form-title">
        Забронировать{" "}
        {selectedItem.houseId
          ? `комнату ${selectedItem.name} в доме ${
              houses.find((h) => h.id === selectedItem.houseId).name
            }`
          : selectedItem.name}
      </p>

      <ReserveBar
        handleOpenCalendarForCheckIn={handleOpenCalendarForCheckIn}
        handleOpenCalendarForCheckOut={handleOpenCalendarForCheckOut}
        handleFilterSelected={handleFilterSelected}
        handleResetInDate={handleResetInDate}
        handleResetOutDate={handleResetOutDate}
        handleGuestsCountChange={handleGuestsCountChange}
        handleKeyDown={handleKeyDown}
        isForm={true}
        register={register}
      />
      {showCalendar ? (
        <Calendar
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onClose={() => setShowCalendar(false)}
          selectedItem={selectedItem}
        />
      ) : (
        <>
          <p>{`Адрес: ${
            selectedItem.address ||
            houses.find((h) => h.id === selectedItem.houseId)?.address
          }`}</p>
          <p>{`Цена за сутки: ${selectedItem.price}`}</p>
          <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="modal__input">
              <label htmlFor="guestName">Ваше имя:</label>
              <input
                {...register("guestName", { required: "Имя обязательно" })}
                placeholder="Имя"
              />
              {errors.guestName && (
                <p className="modal__input-error">{errors.guestName.message}</p>
              )}
            </div>
            <div className="modal__input">
              <label htmlFor="guestContact">Телефон:</label>
              <input
                type="tel"
                {...register("guestContact", {
                  required: "Телефон обязателен",
                  validate: validatePhone,
                })}
                onInput={handlePhoneInput}
                placeholder="Номер телефона"
              />
              {errors.guestContact && (
                <p className="modal__input-error">
                  {errors.guestContact.message ||
                    "Неверный формат номера телефона"}
                </p>
              )}
            </div>
            <button className="modal__submit" type="submit">
              Отправить заявку
            </button>
          </form>
        </>
      )}
    </div>
  );
}
