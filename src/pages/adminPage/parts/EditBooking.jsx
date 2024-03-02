import { useForm } from "react-hook-form"
import { useState, useCallback, useEffect } from "react"
import { getOneBooking } from "../../../api/bookingApi"
import { bookingFields } from "../../../constants/formFields"
import { useApiData } from "../../../contexts/ApiProvider"



export default function EditBooking({ id, onEditSubmit }) {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const { updateBookingData, rooms, aparts, houses } = useApiData();
  const [currentBooking, setCurrentBooking] = useState({});
  const [currentItem, setCurrentItem] = useState(null);
  const [currentHouse, setCurrentHouse] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const bookingData = await getOneBooking(id);
        console.log(bookingData);
        if (bookingData) {
          setCurrentBooking(bookingData);
          Object.keys(bookingData).forEach(key => {
            if (key === 'checkInDate' || key === 'checkOutDate') {
              // console.log('DATEEE!!!!!');
              setValue(key, bookingData[key].slice(0, 10))
              // console.log(bookingData[key].slice(0, 10));
            } else if (key === 'createdAt' || key === 'updatedAt') {
              setValue(key, bookingData[key].slice(0, 10) + ' ' + bookingData[key].slice(11, 16))

            } else {
              setValue(key, bookingData[key]);
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchBookingData();
  }, [id]);

  useEffect(() => {

    let item = null;
    let house = null;
    if (currentBooking.itemType === 'apart') {
      item = aparts.find(el => el.id === currentBooking.itemId);
    } else if (currentBooking.itemType === 'room') {
      item = rooms.find(el => el.id === currentBooking.itemId);
      if (item) {
        house = houses.find(h => h.id === item.houseId);
      }
    }

    setCurrentItem(item);
    setCurrentHouse(house);

    if (currentBooking) {
      Object.keys(currentBooking).forEach(key => {
        if (key !== 'status') {
          if (key === 'checkInDate' || key === 'checkOutDate') {
            // Преобразуем ISO строку в формат "yyyy-MM-dd"
            setValue(key, currentBooking[key].slice(0, 10));
          } else {
            setValue(key, currentBooking[key]);
          }
        }
      });
      setValue('checkInDate', currentBooking.checkInDate?.slice(0, 10));
      setValue('checkOutDate', currentBooking.checkOutDate?.slice(0, 10));
      setValue('status', currentBooking.status);
    }
  }, [currentBooking, aparts, rooms, houses]);


  const clearField = (fieldName) => {
    setValue(fieldName, '')
  }

  const onSubmit = async (data) => {


    const transformedData = {
      ...data,
      checkInDate: new Date(data.checkInDate).toISOString(),
      checkOutDate: new Date(data.checkOutDate).toISOString(),
    };

    await updateBookingData(id, transformedData);
    reset();
    onEditSubmit();
  };

  return (
    <div className="houses_form-add">
      <div className="title">Изменить бронь номер: <p>{currentBooking.id}</p></div>
      <div>{currentBooking.itemType === 'apart' ? (
        <>
          <span>Квартира: {currentItem?.name}</span>
          <br /><br />
          <span>Адрес: {currentItem?.address}</span>
        </>
      ) :
        <div className="items">
          <span><p>Дом: </p><p>{currentHouse?.name}</p></span>
          <span><p>Адрес: </p><p>{currentItem?.address}</p></span>
          <span><p>Комната: </p><p>{currentItem?.name}</p></span>
        </div>
      }

      </div>
      <form onSubmit={handleSubmit(onSubmit)}
        encType="multipart/formdata"
        className="windwos__update-list--points">
        <div className="windows__update-list--point-1 windows__update-list--point">
          <label htmlFor="status">Статус</label>
          <select id="status" {...register("status", { required: true })}>
            <option value="">Выберите статус...</option>
            {["В ожидании", "Подтверждён", "Отменён"].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          {errors.status && <p className="error-message">{errors.status.message}</p>}
        </div>
        {bookingFields.filter(el => {
          return el.name !== 'itemId' && el.name !== 'itemType' && el.name !== 'status'
        }).map((field, index) => (
          <div key={index}
          className={`windows__update-list--point-1 windows__update-list--point ${field.type === 'checkbox' ? 'checkbox' : ''}`}>
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
  );
}
