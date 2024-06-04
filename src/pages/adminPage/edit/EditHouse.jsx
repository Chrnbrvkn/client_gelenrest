import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { houseFields } from "../../../constants/formFields";
import { updateHouseAsync } from "../../../store/features/lists/houses/housesFetch";
import { setNotification } from "../../../store/features/notification/notificationSlice";
import { AdminGalery } from "src/widgets/AdminGalery";
import { ImageUpload } from "src/widgets/ImageUpload";

export default function EditHouse({ houseId, onCancel }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const isLoading = useSelector((state) => state.houses.isLoading);

  const house =
    useSelector((state) =>
      state.houses.data.find((house) => house.id === houseId)
    ) || {};

  const clearField = (fieldName) => {
    setValue(fieldName, "");
  };

  useEffect(() => {
    Object.keys(house).forEach((key) => {
      setValue(key, house[key]);
    });
  }, [house, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      await dispatch(updateHouseAsync({ houseId, formData })).unwrap();

      dispatch(
        setNotification({
          message: `Дом ${data.name} изменён.`,
          type: "success",
        })
      );
    } catch (e) {
      dispatch(
        setNotification({
          message: `Ошибка при изменении дома. 
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
      <div>Изменить дом {house.name}</div>
      <AdminGalery images={house.images} item={house} type={"house"} />
      <ImageUpload id={houseId} type={"house"} />{" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="windows__update-list--points"
        encType="multipart/form-data"
      >
        {houseFields.map((field, index) => {
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
                placeholder={field.label}
                type={field.type}
                name={field.name}
                {...register(field.name, { required: field.requare })}
              />
              {errors[field.name] && <span>{field.error}</span>}
              <button type="button" onClick={() => clearField(field.name)}>
                Очистить
              </button>
            </div>
          );
        })}
        <button className="save" type="submit">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
}
