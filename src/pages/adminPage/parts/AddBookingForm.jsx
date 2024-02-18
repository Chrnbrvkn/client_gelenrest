import { useState, useRef, useCallback, useEffect } from "react"
import { createBooking } from "../../../api/bookingApi"
import { useForm } from "react-hook-form"
import { bookingFields } from "../../../constants/formFields"
import { useAdmin } from "../../../contexts/AdminProvider"
import { useApiData } from "../../../contexts/ApiProvider"
import ChooseReserveTime from "../../reservePage/ChooseReserveTime"
import SelectedItemCalendar from "../../../components/SelectedItemCalendar"


export default function AddBookingForm({ onFetchBooking }) {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm()
  const { selectedItem, setViewState } = useAdmin()
  const { rooms, aparts, houses, isSubmitting, setIsSubmitting } = useApiData()


  const [showCalendar, setShowCalendar] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  useEffect(() => {
    if (selectedItem) {

      setValue('itemId', selectedItem.id);
      setValue('itemName', selectedItem.name);
      setValue('dailyRate', selectedItem.price);

      setValue('checkInDate', checkInDate ? checkInDate.toISOString() : '');
      setValue('checkOutDate', checkOutDate ? checkOutDate.toISOString() : '');
      console.log(checkInDate);
      console.log(checkOutDate);
      if (selectedItem.houseId) {
        const house = houses.find(h => h.id === selectedItem.houseId);
        if (house) {
          setValue('itemType', 'room');
          setValue('houseName', house.name);
          setValue('address', house.address);
        }
      } else {
        setValue('itemT ype', 'apart');
        setValue('houseName', '');
        setValue('address', selectedItem.address);
      }
    }
  }, [checkInDate, checkOutDate, houses, watch, setValue]);

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
      onFetchBooking()
    }
  }, [isSubmitting, setIsSubmitting, reset]);


  // CALENDAR


  const handleOpenCalendarForCheckIn = () => {
    setShowCalendar(true);
    setCheckInDate(null);
  };

  const handleOpenCalendarForCheckOut = () => {
    if (!checkInDate) {
      handleOpenCalendarForCheckIn();
    } else {
      setShowCalendar(true);
      setCheckOutDate(null);
    }
  };

  const closeCalendar = () => {
    setShowCalendar(false); // Сброс подсказок при закрытии календаря
  };
  // CALENDAR

  return (
    <div className="houses_form-add">
      <p>{!selectedItem.houseId ? `Название квартиры: ${selectedItem.name}`
        : `Название дома: ${houses.find(h => selectedItem.houseId === h.id).name}, название комнаты: ${selectedItem.name}`}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="windows__update-list--points">


        <div className="windows__update-list--point-1 windows__update-list--point">
          <p>Дата заезда</p>
          <div className="selected__date" onClick={handleOpenCalendarForCheckIn}>
            {checkInDate ? checkInDate.toLocaleDateString() : 'Выберите дату заезда'}
          </div>
        </div>
        <div className="windows__update-list--point-1 windows__update-list--point">
          <p>Дата выезда</p>
          <div className="selected__date" onClick={handleOpenCalendarForCheckOut}>
            {checkOutDate ? checkOutDate.toLocaleDateString() : 'Выберите дату выезда'}
          </div>
        </div>
        {showCalendar && (
          <SelectedItemCalendar
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            onClose={closeCalendar}
            selectedItem={selectedItem} // Передаём выбранный элемент, если нужно
          />
        )}

        {bookingFields
          .filter(field => !['checkInDate', 'checkOutDate', 'itemId', 'itemType', 'itemName', 'address', 'houseName', 'dailyRate', 'totalAmount', 'totalDays', 'bookingDate']
            .includes(field.name)).map((field, index) => {
              return field.type === 'select' ? (
                <div key="status" className="windows__update-list--point-1 windows__update-list--point">
                  <p>Статус бронирования</p>
                  <select {...register("status", { required: true })}>
                    <option value="">Выберите статус...</option>
                    {["В ожидании", "Подтверждён", "Отклонён"].map(status => (
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
                    {...register(field.name, { required: false })}
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