import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { bookingFields } from "../../../constants/formFields"
import { updateBookingAsync } from "../../../store/features/lists/booking/bookingFetch"
import { useSelector, useDispatch } from "react-redux"
import LoadingSpinner from "../../../components/LoadingSpinner"

import Calendar from "../../../components/Calendar"
import { setNotification } from "../../../store/features/notification/notificationSlice";
import { fetchApartsAsync } from "../../../store/features/lists/aparts/apartsFetch"
import { fetchAllRoomsAsync } from "../../../store/features/lists/rooms/roomsFetch"
import { fetchClientBooking } from "../../../store/features/lists/clientBooking/clientBookingFetch";

const UNUSED_FIELDS = ['status', 'checkInDate', 'checkOutDate', 'itemId', 'itemType', 'itemName', 'address', 'houseName', 'dailyRate', 'totalAmount', 'totaldays', 'bookingDate', 'createdAt', 'updatedAt']



export default function EditBooking({ selectedBooking, onCancel }) {

  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  const isLoading = useSelector((state) => state.loading.isLoading);

  const aparts = useSelector(state => state.aparts.data);
  const rooms = useSelector(state => state.rooms.allRooms);
  const booking = useSelector((state) => state.clientBooking.data);


  console.log(selectedBooking);
  //CALENDAR

  const [selectedItem, setSelectedItem] = useState(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [checkInDate, setCheckInDate] = useState(selectedBooking.checkInDate);
  const [checkOutDate, setCheckOutDate] = useState(selectedBooking.checkOutDate);


  useEffect(() => {
    if (!aparts || !rooms) {
      dispatch(fetchAllRoomsAsync())
      dispatch(fetchApartsAsync())
    }
    fetchClientBooking()
  }, [aparts, rooms])


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

    const initAsyncData = async () => {
      if (!rooms.length || !aparts.length) {
        await Promise.all([
          dispatch(fetchAllRoomsAsync()),
          dispatch(fetchApartsAsync())
        ]);
      }
  
      if (selectedBooking.houseId) {
        setSelectedItem(rooms.find(r => r.id === selectedBooking.roomId));
      } else {
        setSelectedItem(aparts.find(a => a.id === selectedBooking.apartId));
      }
    };
  
    initAsyncData();

    if (selectedBooking) {
      Object.keys(selectedBooking).forEach(key => {
        if (key === 'checkInDate' || key === 'checkOutDate') {

          setValue(key, selectedBooking[key].slice(0, 10))

        } 
        // else if (key === 'createdAt' || key === 'updatedAt') {
        //   setValue(key, selectedBooking[key].slice(0, 10) + ' ' + selectedBooking[key].slice(11, 16))

        // } 
        else {
          setValue(key, selectedBooking[key]);
        }
      });
    }

  }, [selectedBooking, rooms, aparts, dispatch]);


  const clearField = (fieldName) => {
    setValue(fieldName, '')
  }




  // const isIntervalFree = (checkIn, checkOut) => {

  //   // Преобразование дат в формат YYYY-MM-DD для сравнения
  //   const startDate = new Date(checkIn).setHours(0, 0, 0, 0);
  //   const endDate = new Date(checkOut).setHours(23, 59, 59, 999);

  //   return !booking.some(b => {


  //     const existingStart = new Date(b.checkInDate).setHours(0, 0, 0, 0);
  //     const existingEnd = new Date(b.checkOutDate).setHours(23, 59, 59, 999);

  //     // Проверка на пересечение интервалов
  //     return (existingStart <= endDate && existingEnd >= startDate);
  //   });
  // };




  const onSubmit = async (data) => {
    try {


      const formattedData = {
        ...data,
        totaldays: new Date(data.checkOutDate).getDate() - new Date(data.checkInDate).getDate(),
        checkInDate: new Date(data.checkInDate).toISOString(),
        checkOutDate: new Date(data.checkOutDate).toISOString(),
      };


      // if (!isIntervalFree(checkInDate, checkOutDate)) {
      //   dispatch(setNotification({
      //     message: 'Выбранный интервал содержит забронированные даты.',
      //     type: 'error',
      //   }));
      //   return;
      // }


      const numericFields = ['totalCost', 'guestsCount', 'dailyRate', 'childAge', 'petWeight'];
      numericFields.forEach(field => {
        if (field !== 'houseName' && formattedData[field] === '') {
          formattedData[field] = null;
        } else {
          formattedData[field] = Number(formattedData[field]);
        }
      });


      console.log("formattedData : ", formattedData);
      console.log("Selected Booking ID:", selectedBooking.id);

      await dispatch(updateBookingAsync({ bookingId: selectedBooking.id, formattedData })).unwrap()

      dispatch(setNotification({
        message: `Бронь ${selectedBooking.id} для ${formattedData.itemName} изменена.`,
        type: 'success',
      }))

    } catch (e) {
      console.log(e);
      dispatch(setNotification({
        message: `Ошибка при изменении брони. 
        ${e.message}`,
        type: 'error',
      }))
    } finally {
      reset();
      onCancel();
    }
  };


  return (

    isLoading ? <LoadingSpinner />
      :
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
              <Calendar
                checkInDate={checkInDate}
                setCheckInDate={setCheckInDate}
                checkOutDate={checkOutDate}
                setCheckOutDate={setCheckOutDate}
                onClose={closeCalendar}
                selectedItem={selectedItem}
                selectedBooking={selectedBooking}
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
