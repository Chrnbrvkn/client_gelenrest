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
  }, [currentBooking, aparts, rooms, houses]);


  const clearField = (fieldName) => {
    setValue(fieldName, '')
  }

  const onSubmit = async (data) => {
    await updateBookingData(id, data);
    reset();
    onEditSubmit();
  };

  return (
    <div className="houses_form-add">
      <div>Изменить бронь номер: {currentBooking.id}</div>
      <div>{currentBooking.itemType === 'apart' ? (
        <>
          <span>Квартира: {currentItem?.name}</span>
          <br /><br />
          <span>Адрес: {currentItem?.address}</span>
        </>
      ) :
        <>
          <span>Дом: {currentHouse?.name}</span>
          <br /><br />
          <span>Адрес: {currentItem?.address}</span>
          <br /><br />
          <span>Комната: {currentItem?.name}</span>
        </>
      }

      </div>
      <form onSubmit={handleSubmit(onSubmit)}
        encType="multipart/formdata"
        className="windwos__update-list--points">
        {bookingFields.filter(el => {
          return el.name !== 'itemId' && el.name !== 'itemType'
        }).map((field, index) => (
          <div key={index}
            className="windows__update-list--point-1  windows__update-list--point">
            <label>{field.label}</label>
            <input
              placeholder={field.label}
              type={field.type}
              name={field.name}
              {...register(field.name, { required: false })}
            />
            {errors[field.name] && <p className="error-message">
              {errors[field.name]?.message}
            </p>}
            <button type="button" onClick={() => clearField(field.name)}>Очистить</button>
          </div>
        ))}
        <button type="submit" className="save">Сохранить бронь</button>
      </form>
    </div>
  );
}
