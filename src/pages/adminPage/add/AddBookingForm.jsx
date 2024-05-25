import { useState, useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { bookingFields } from "../../../constants/formFields"
 
import LoadingSpinner from '../../../components/LoadingSpinner';
import { createBookingAsync } from '../../../store/features/lists/booking/bookingFetch';
import { setCheckInDate, setCheckOutDate} from "../../../store/features/reserve/reserveSlice";

import { useReserveDate } from "src/widgets/ReserveDate";

import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from "../../../store/features/notification/notificationSlice";
import Calendar from "../../../components/Calendar";

const UNUSED_FIELDS = ['status', 'checkInDate', 'checkOutDate', 'itemId', 'itemType', 'itemName', 'address', 'houseName', 'dailyRate', 'totalAmount', 'totaldays', 'bookingDate']


export default function AddBookingForm({ onCancel, selectedItem }) {

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()


  const houses = useSelector((state) => state.houses.data);
  const isLoading = useSelector((state) => state.loading.isLoading);


  // const [showCalendar, setShowCalendar] = useState(false);
  // const [checkInDate, setCheckInDate] = useState(null);
  // const [checkOutDate, setCheckOutDate] = useState(null);
  const { checkInDate, checkOutDate } = useSelector((state) => state.reserve);
  const {
    showCalendar,
    setShowCalendar,
    handleOpenCalendarForCheckIn,
    handleOpenCalendarForCheckOut,
    handleFilterSelected,
    handleResetInDate,
    handleResetOutDate,
  } = useReserveDate();

  useEffect(() => {
    if (selectedItem) {

      setValue('itemId', selectedItem.id);
      setValue('itemName', selectedItem.name);
      setValue('dailyRate', selectedItem.price);

      setValue('checkInDate', checkInDate ? checkInDate.slice(0, 10) : '');
      setValue('checkOutDate', checkOutDate ? checkOutDate.slice(0, 10) : '');
      if (checkOutDate && checkInDate) {
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        const totalCost =
          selectedItem.price * ((endDate - startDate) / (24 * 3600000));
        console.log(totalCost);
        setValue("totalCost", totalCost);
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

  const closeCalendar = useCallback(() => {
    setShowCalendar(false);
  }, []);

  const onSubmit = useCallback(async (data) => {
    const formattedData = {...data};
    const numericFields = ['totalCost', 'guestsCount', 'dailyRate', 'totaldays', 'childAge', 'petWeight'];
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
          <p>{`Цена за сутки: ${selectedItem.price}`}</p>
          <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/formdata"
          className="windwos__update-list--points"
        >
          <div className="windows__update-list--point-1 windows__update-list--point">
            <label htmlFor="status">Статус</label>
            <select
              id="status"
              {...register("status", { required: true })}
              defaultValue={"В ожидании"}
            >
              {["В ожидании", "Подтверждён", "Отменён"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {/* {errors.status && (
              <p className="error-message">{errors.status.message}</p>
            )} */}
          </div>

          <div className="windows__update-list--point-1 windows__update-list--point">
            <p>Дата заезда</p>
            <div
              className="selected__date"
              onClick={handleOpenCalendarForCheckIn}
            >
              {checkInDate
                ? checkInDate.slice(0, 10)
                : showCalendar
                ? "Выберите дату заезда"
                : "Заезд"}
            </div>
          </div>
          <div className="windows__update-list--point-1 windows__update-list--point">
            <p>Дата выезда</p>
            <div
              className="selected__date"
              onClick={() => handleOpenCalendarForCheckOut(checkOutDate)}
            >
              {checkOutDate
                ? checkOutDate.slice(0, 10)
                : showCalendar
                ? "Выберите дату выезда"
                : "Выезд"}
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
              // selectedBooking={selectedBooking}
              isAdmin={true}
            />
          )}

          {bookingFields
            .filter((field) => !UNUSED_FIELDS.includes(field.name))
            .map((field, index) => (
              <div
                key={index}
                className={`windows__update-list--point-1 windows__update-list--point 
                  ${field.type === "checkbox" ? "check" : ""}`}
              >
                <label>{field.label}</label>
                <input
                  placeholder={field.label}
                  type={field.type}
                  name={field.name}
                  {...register(field.name, { required: field.requare })}
                />
                {errors[field.name] && <p>{field.error}</p>}
                <button type="button" onClick={() => clearField(field.name)}>
                  Очистить
                </button>
              </div>
            ))}
          <button type="submit" className="save">
            Сохранить бронь
          </button>
        </form>
          {/* <form onSubmit={handleSubmit(onSubmit)}
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
          </form> */}
        </div>
      </>
  );
}