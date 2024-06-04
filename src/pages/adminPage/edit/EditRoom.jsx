import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { roomFields } from "../../../constants/formFields";
import { updateRoomAsync } from "../../../store/features/lists/rooms/roomsFetch";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { setNotification } from "../../../store/features/notification/notificationSlice";
import { AdminGalery } from "src/widgets/AdminGalery";
import { ImageUpload } from "src/widgets/ImageUpload";

export default function EditRoom({ roomId, onCancel, rooms }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const selectedHouseId = useSelector(
    (state) => state.adminPage.selectedHouseId
  );

  const isLoading = useSelector((state) => state.rooms.isLoading);

  const room = rooms.find(room => room.id === roomId) || {};

  const clearField = (fieldName) => {
    setValue(fieldName, "");
  };

  useEffect(() => {
    Object.keys(room).forEach((key) => {
      setValue(key, room[key]);
    });
  }, [room, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      await dispatch(
        updateRoomAsync({
          houseId: selectedHouseId,
          roomId,
          roomData: formData,
        })
      ).unwrap();

      dispatch(
        setNotification({
          message: `Комната ${data.name} изменена.`,
          type: "success",
        })
      );
    } catch (e) {
      dispatch(
        setNotification({
          message: `Ошибка при изменении комнаты. 
        ${e.message}`,
          type: "error",
        })
      );
      console.log(e);
    } finally {
      reset();
      onCancel();
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="houses_form-add">
      <h2>Изменить комнату {room.name}</h2>

      <AdminGalery images={room.images} item={room} type={"room"} />
      <ImageUpload id={roomId} type={"room"} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="windows__update-list--points"
        encType="multipart/form-data"
      >
        {roomFields.map((field, index) => {
          if (field.type === "price") {
            return (
              <div key={index} className="windows__update-loist--point">
                <label>{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.label}
                  min={0}
                  step={"0.01"}
                  name={field.name}
                  {...register(field.name, { required: field.requare })}
                />
              </div>
            );
          }

          if (field.type === "select") {
            return (
              <div key={index} className="windows__update-list--point">
                <label>{field.label}</label>
                <select {...register(field.name, { required: field.requare })}>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors[field.name] && <p>{field.error}</p>}
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`windows__update-list--point-1 windows__update-list--point ${
                field.type === "checkbox" ? "checkbox" : ""
              }`}
            >
              <label>{field.label}</label>
              <input
                placeholder={field.placeholder}
                type={field.type}
                {...register(field.name, { required: field.require })}
              />
              {errors[field.name] && (
                <span className="error">{field.error}</span>
              )}
              <button type="button" onClick={() => clearField(field.name)}>
                Очистить
              </button>
            </div>
          );
        })}

        <button type="submit" className="save">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
}
