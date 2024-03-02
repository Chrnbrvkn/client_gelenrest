import { useState, useRef, useCallback, useEffect } from "react"
import { createBooking } from "../../../api/bookingApi"
import { useForm } from "react-hook-form"
import { bookingFields } from "../../../constants/formFields"
import { useAdmin } from "../../../contexts/AdminProvider"
import { useApiData } from "../../../contexts/ApiProvider"
import AdminCalendar from "../../../components/AdminCalendar"


export default function AddBookingForm({ onFetchBooking }) {
  const { register, handleSubmit, formState: { errors }, reset, setValue} = useForm()
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
      if(checkOutDate && checkInDate ){
        const totalCost = selectedItem.price * ((checkOutDate - checkInDate) / (24 * 3600000))
        console.log(totalCost);
        setValue('totalCost', totalCost)
      }
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
  }, [checkInDate, checkOutDate, houses, setValue]);

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
      setCheckOutDate(null);
    }
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  
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
          <AdminCalendar
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            onClose={closeCalendar}
            selectedItem={selectedItem}
          />
        )}

        {bookingFields
          .filter(field => !['checkInDate', 'checkOutDate', 'itemId', 'itemType', 'itemName', 'address', 'houseName', 'dailyRate', 'totalAmount', 'totalDays', 'bookingDate']
            .includes(field.name)).map((field, index) => {
              return field.type === 'select' ? (
                <div key="status" className="windows__update-list--point-1 windows__update-list--point" >
                  <p>Статус бронирования</p>
                  <select {...register("status", { required: true })} tabIndex={-1}>
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
                    {...register(field.name, { required: field.requare })}
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