import { useState, useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { bookingFields } from "../../../constants/formFields"
import AdminCalendar from "../../../components/AdminCalendar"
// import ErrorMessage from '../../../components/ErrorMessage';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { createBookingAsync } from '../../../store/features/lists/booking/bookingFetch';


import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from "../../../store/features/notification/notificationSlice";
import Calendar from "../../../components/Calendar";

const UNUSED_FIELDS = ['checkInDate', 'checkOutDate', 'itemId', 'itemType', 'itemName', 'address', 'houseName', 'dailyRate', 'totalAmount', 'totalDays', 'bookingDate']


export default function AddBookingForm({ onCancel, selectedItem }) {

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()


  const houses = useSelector((state) => state.houses.data);
  const isLoading = useSelector((state) => state.loading.isLoading);


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
      if (checkOutDate && checkInDate) {
        const totalCost = selectedItem.price * ((checkOutDate - checkInDate) / (24 * 3600000))

        setValue('totalCost', Math.round(totalCost));
      }
      if (selectedItem.houseId) {
        const house = houses.find(h => h.id === selectedItem.houseId);
        if (house) {
          setValue('roomId', selectedItem.id);
          setValue('itemType', 'room');
          setValue('houseId', house.id);
          setValue('houseName', house.name);
          setValue('address', house.address);
        }
      } else {
        setValue('apartId', selectedItem.id);
        setValue('itemType', 'apart');
        setValue('houseName', '');
        setValue('address', selectedItem.address);
      }
    }
  }, [checkInDate, checkOutDate, houses, setValue]);

  const handleOpenCalendarForCheckIn = (e) => {

    if(e){
      e.preventDefault()
      e.stopPropagation()
      setShowCalendar(true);
      setCheckInDate(null);
    }
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
    const formattedData = {...data};
    const numericFields = ['totalCost', 'guestsCount', 'dailyRate', 'totalDays', 'childAge', 'petWeight'];
    numericFields.forEach(field => {
      if (field !== 'houseName' && formattedData[field] === '') {
        formattedData[field] = null;
      } else {
        formattedData[field] = Number(formattedData[field]);
      }
    });
    
    try {

      dispatch(createBookingAsync(formattedData));
      
      dispatch(setNotification({
        message: `Бронь для ${formattedData.itemName} добавлена.`,
        type: 'success',
      }))

    } catch (e) {
      console.error(e);
      dispatch(setNotification({
        message: `Ошибка при добавлении брони. 
        ${e.message}`,
        type: 'error',
      }))
    } finally {
      reset();
      onCancel()
    }
  }, [reset, dispatch, onCancel]);

  return (
    isLoading ? <LoadingSpinner />
      :
      <>
        <div className="houses_form-add">
          <p className="name__house">{!selectedItem.houseId ? `Название квартиры: ${selectedItem.name}`
            : `Название дома: ${houses.find(h => selectedItem.houseId === h.id).name}, название комнаты: ${selectedItem.name}`}
          </p>
          <form onSubmit={handleSubmit(onSubmit)}
            className="windows__update-list--points">

            <div className="windows__update-list--point-1 windows__update-list--point">
              <p>Дата заезда</p>
              <div className="selected__date"
                onClick={handleOpenCalendarForCheckIn}>
                {checkInDate ? checkInDate.toLocaleDateString() : 'Выберите дату заезда'}
              </div>
            </div>
            <div className="windows__update-list--point-1 windows__update-list--point">
              <p>Дата выезда</p>
              <div className="selected__date"
                onClick={handleOpenCalendarForCheckOut}>
                {checkOutDate ? checkOutDate.toLocaleDateString() : 'Выберите дату выезда'}
              </div>
            </div>
            {showCalendar && (
              <Calendar
                checkInDate={checkInDate}
                setCheckInDate={setCheckInDate}
                checkOutDate={checkOutDate}
                setCheckOutDate={setCheckOutDate}
                onClose={closeCalendar}
                selectedItem={selectedItem}
              />
            )}

            {bookingFields
              .filter(field => !UNUSED_FIELDS
                .includes(field.name)).map((field, index) => {

                  return field.type === 'select' ? (
                    <div key="status"
                      className="windows__update-list--point-1 windows__update-list--point" >
                      <p>Статус бронирования</p>
                      <select {...register("status", { required: true })} tabIndex={-1}>
                        {["В ожидании", "Подтверждён", "Отменён"].map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      {errors.status && <p>{errors.status.message}</p>}
                    </div>
                  ) : (
                    <div key={index}
                      className={`windows__update-list--point-1 windows__update-list--point ${field.type === 'checkbox' ? 'checked' : ''}`}>
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

            <button type="submit" className="save" >
              Добавить бронирование
            </button>
          </form>
        </div>
      </>
  );
}