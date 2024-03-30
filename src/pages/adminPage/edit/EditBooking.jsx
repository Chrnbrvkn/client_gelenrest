import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { bookingFields } from "../../../constants/formFields"
import { updateBookingAsync } from "../../../store/features/lists/booking/bookingFetch"
import { useSelector } from "react-redux"
import LoadingSpinner from "../../../components/LoadingSpinner"

import AdminCalendar from "../../../components/AdminCalendar"

const UNUSED_FIELDS = ['status', 'checkInDate', 'checkOutDate', 'itemId', 'itemType', 'itemName', 'address', 'houseName', 'dailyRate', 'totalAmount', 'totalDays', 'bookingDate']


export default function EditBooking({ selectedBooking, onCancel }) {

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  const isLoading = useSelector((state) => state.loading.isLoading);

  const aparts = useSelector(state => state.aparts);
  const rooms = useSelector(state => state.rooms.allRooms);


  console.log(selectedBooking);
  //CALENDAR

  const [selectedItem, setSelectedItem] = useState(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [checkInDate, setCheckInDate] = useState(selectedBooking.checkInDate);
  const [checkOutDate, setCheckOutDate] = useState(selectedBooking.checkOutDate);

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

  //CALENDAR

  useEffect(() => {

    if (selectedBooking.type === 'apart') {
      setSelectedItem(aparts.find(apart => apart._id === selectedBooking.itemId))
    }
    if (selectedBooking.type === 'room') {
      setSelectedItem(rooms.find(room => room._id === selectedBooking.itemId))
    }

    if (selectedBooking) {
      Object.keys(selectedBooking).forEach(key => {
        if (key === 'checkInDate' || key === 'checkOutDate') {

          setValue(key, selectedBooking[key].slice(0, 10))

        } else if (key === 'createdAt' || key === 'updatedAt') {
          setValue(key, selectedBooking[key].slice(0, 10) + ' ' + selectedBooking[key].slice(11, 16))

        } else {
          setValue(key, selectedBooking[key]);
        }
      });
    }

  }, [selectedBooking, setValue, aparts, rooms]);


  const clearField = (fieldName) => {
    setValue(fieldName, '')
  }

  const onSubmit = async (data) => {
    try {
      const transformedData = {
        ...data,
        checkInDate: new Date(data.checkInDate).toISOString(),
        checkOutDate: new Date(data.checkOutDate).toISOString(),
      };

      updateBookingAsync(selectedBooking.id, transformedData);
    } catch (e) {
      console.log(e);
      return null
    } finally {
      reset();
      onCancel();
    }
  };
  console.log(selectedBooking);
  return (

    isLoading ? <LoadingSpinner /> :
      <>
        <div className="houses_form-add">
          <div className="title">
            <p>Изменить бронь номер: {selectedBooking.id}</p>
          </div>

          {selectedBooking.itemType === 'apart' ? (
            <>
              <span>Квартира: {selectedBooking.itemName}</span>
              <br /><br />
              <span>Адрес: {selectedBooking.address}</span>
            </>
          ) : (
            <div className="items">
              <span><p>Дом: </p><p>{selectedBooking.houseName}</p></span>
              <span><p>Адрес: </p><p>{selectedBooking.address}</p></span>
              <span><p>Комната: </p><p>{selectedBooking.itemName}</p></span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}
            encType="multipart/formdata"
            className="windwos__update-list--points">
            <div className="windows__update-list--point-1 windows__update-list--point">
              <label htmlFor="status">Статус</label>
              <select id="status" {...register("status", { required: true })} defaultValue={selectedBooking.status}>
                {["В ожидании", "Подтверждён", "Отменён"].map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {errors.status && <p className="error-message">{errors.status.message}</p>}
            </div>

            <div className="windows__update-list--point-1 windows__update-list--point">
              <p>Дата заезда</p>
              <div className="selected__date"
                onClick={handleOpenCalendarForCheckIn}>
                {checkInDate ? new Date(checkInDate).toLocaleDateString() : 'Выберите дату заезда'}
              </div>
            </div>
            <div className="windows__update-list--point-1 windows__update-list--point">
              <p>Дата выезда</p>
              <div className="selected__date"
                onClick={handleOpenCalendarForCheckOut}>
                {checkOutDate ? new Date(checkOutDate).toLocaleDateString() : 'Выберите дату выезда'}
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

            {bookingFields.filter(field => !UNUSED_FIELDS
              .includes(field.name))
              .map((field, index) => (
                <div key={index}
                  className={`windows__update-list--point-1 windows__update-list--point 
                  ${field.type === 'checkbox' ? 'check' : ''}`}
                >
                  <label>{field.label}</label>
                  <input
                    placeholder={field.label}
                    type={field.type}
                    name={field.name}
                    {...register(field.name, { required: field.requare })}
                  />
                  {errors[field.name] && <p className="error-message">
                    {errors[field.name]?.message}
                  </p>}
                  <button type="button" onClick={() => clearField(field.name)}>Очистить</button>
                </div>
              )

              )}
            <button type="submit" className="save">Сохранить бронь</button>
          </form>
        </div>
      </>

  );
}
