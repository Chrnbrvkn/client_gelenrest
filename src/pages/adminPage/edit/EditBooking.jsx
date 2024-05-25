import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { bookingFields } from "../../../constants/formFields";
import { updateBookingAsync } from "../../../store/features/lists/booking/bookingFetch";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../../components/LoadingSpinner";

import Calendar from "../../../components/Calendar";
import { setNotification } from "../../../store/features/notification/notificationSlice";
// import { fetchApartsAsync } from "../../../store/features/lists/aparts/apartsFetch"
// import { fetchAllRoomsAsync } from "../../../store/features/lists/rooms/roomsFetch"
// import { fetchClientBooking } from "../../../store/features/lists/clientBooking/clientBookingFetch";
import { useReserveDate } from "src/widgets/ReserveDate";

import {
  setCheckInDate,
  setCheckOutDate,
} from "../../../store/features/reserve/reserveSlice";

const UNUSED_FIELDS = [
  "status",
  "checkInDate",
  "checkOutDate",
  "itemId",
  "itemType",
  "itemName",
  "address",
  "houseName",
  "dailyRate",
  "totalAmount",
  "totaldays",
  "bookingDate",
  "createdAt",
  "updatedAt",
];

export default function EditBooking({ selectedBooking, onCancel }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const isLoading = useSelector((state) => state.loading.isLoading);

  const aparts = useSelector((state) => state.aparts.data);
  const rooms = useSelector((state) => state.rooms.allRooms);
  const booking = useSelector((state) => state.clientBooking.data);

  console.log(selectedBooking);
  //CALENDAR

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
    dispatch(setCheckInDate(selectedBooking.checkInDate));
    dispatch(setCheckOutDate(selectedBooking.checkOutDate));
  }, [dispatch, selectedBooking.checkInDate, selectedBooking.checkOutDate]);

  const [selectedItem, setSelectedItem] = useState(null);

  const closeCalendar = useCallback(() => {
    setShowCalendar(false);
  }, []);

  // useEffect(() => {
  //   if (!aparts || !rooms) {
  //     dispatch(fetchAllRoomsAsync())
  //     dispatch(fetchApartsAsync())
  //   }
  //   fetchClientBooking()
  // }, [aparts, rooms])

  // const handleOpenCalendarForCheckIn = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   setShowCalendar(true);
  //   setCheckInDate(null);
  // };

  // const handleOpenCalendarForCheckOut = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   if (!checkInDate) {
  //     handleOpenCalendarForCheckIn();
  //   } else {
  //     setShowCalendar(true);
  //     setCheckOutDate(null);
  //   }
  // };

  // const closeCalendar = () => {
  //   setShowCalendar(false);
  // };

  //CALENDAR

  useEffect(() => {
    // const initAsyncData = async () => {
    //   if (!rooms.length || !aparts.length) {
    //     await Promise.all([
    //       dispatch(fetchAllRoomsAsync()),
    //       dispatch(fetchApartsAsync()),
    //     ]);
    //   }

    // };

    // initAsyncData();

    if (selectedBooking.houseId) {
      setSelectedItem(rooms.find((r) => r.id === selectedBooking.roomId));
    } else {
      setSelectedItem(aparts.find((a) => a.id === selectedBooking.apartId));
    }

    if (selectedBooking) {
      Object.keys(selectedBooking).forEach((key) => {
        if (key !== "updatedAt" && key !== "createdAt" && key !== "deletedAt") {
          if (key === "checkInDate") {
            setValue(key, 
              checkInDate 
              ? checkInDate.slice(0, 10)
              : selectedBooking.checkInDate
            );
          }
          if (key === "checkOutDate") {
            setValue(key, 
              checkOutDate
              ? checkOutDate.slice(0, 10)
              : selectedBooking.checkOutDate
            );
          } else {
            setValue(key, selectedBooking[key]);
          }
        }
      });
    }
  }, [selectedBooking, rooms, aparts, dispatch, checkInDate, checkOutDate]);

  const clearField = (fieldName) => {
    setValue(fieldName, "");
  };

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        totaldays:
          new Date(data.checkOutDate).getDate() -
          new Date(data.checkInDate).getDate(),
        checkInDate: new Date(data.checkInDate).toISOString(),
        checkOutDate: new Date(data.checkOutDate).toISOString(),
      };

      const numericFields = [
        "totalCost",
        "guestsCount",
        "dailyRate",
        "childAge",
        "petWeight",
      ];
      numericFields.forEach((field) => {
        if (field !== "houseName" && formattedData[field] === "") {
          formattedData[field] = null;
        } else {
          formattedData[field] = Number(formattedData[field]);
        }
      });

      console.log("Selected Booking ID:", selectedBooking.id);
      console.log("formattedData : ", formattedData);
      console.log("CHECKIN:", formattedData.checkInDate);
      console.log("CHECKOUT:", formattedData.checkOutDate);

      dispatch(
        updateBookingAsync({ bookingId: selectedBooking.id, formattedData })
      );

      dispatch(
        setNotification({
          message: `Бронь ${selectedBooking.id} для ${formattedData.itemName} изменена.`,
          type: "success",
        })
      );
    } catch (e) {
      console.log(e);
      dispatch(
        setNotification({
          message: `Ошибка при изменении брони. 
        ${e.message}`,
          type: "error",
        })
      );
    } finally {
      reset();
      onCancel();
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="houses_form-add">
        <div className="title">
          <p>Изменить бронь номер: {selectedBooking.id}</p>
        </div>

        {selectedBooking.itemType === "apart" ? (
          <>
            <span>Квартира: {selectedBooking.itemName}</span>
            <br />
            <br />
            <span>Адрес: {selectedBooking.address}</span>
          </>
        ) : (
          <div className="items">
            <span>
              <p>Дом: </p>
              <p>{selectedBooking.houseName}</p>
            </span>
            <span>
              <p>Адрес: </p>
              <p>{selectedBooking.address}</p>
            </span>
            <span>
              <p>Комната: </p>
              <p>{selectedBooking.itemName}</p>
            </span>
          </div>
        )}

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
              defaultValue={selectedBooking.status}
            >
              {["В ожидании", "Подтверждён", "Отменён"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="error-message">{errors.status.message}</p>
            )}
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
                ? "Заезд"
                : selectedBooking.checkInDate.slice(0, 10)}
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
                ? "Выезд"
                : selectedBooking.checkInDate.slice(0, 10)}
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
                {errors[field.name] && (
                  <p className="error-message">{errors[field.name]?.message}</p>
                )}
                <button type="button" onClick={() => clearField(field.name)}>
                  Очистить
                </button>
              </div>
            ))}
          <button type="submit" className="save">
            Сохранить бронь
          </button>
        </form>
      </div>
    </>
  );
}
