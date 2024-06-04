import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { apartFields } from "../../../constants/formFields";
import { fetchApartsAsync, updateApartAsync } from "../../../store/features/lists/aparts/apartsFetch";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { setNotification } from "../../../store/features/notification/notificationSlice";
import { AdminGalery } from "src/widgets/AdminGalery";
import { ImageUpload } from "src/widgets/ImageUpload";

export default function EditApart({ apartId, onCancel }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const isLoading = useSelector((state) => state.loading.isLoading);

  const apart =
    useSelector((state) =>
      state.aparts.data.find((apart) => apart.id === apartId)
    ) || {};

  const clearField = (fieldName) => {
    setValue(fieldName, "");
  };

  useEffect(() => {
    Object.keys(apart).forEach((key) => {
      setValue(key, apart[key]);
    });
  }, [apart, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      await dispatch(updateApartAsync({ apartId, formData })).unwrap();

      dispatch(
        setNotification({
          message: `Квартира ${data.name} изменена.`,
          type: "success",
        })
      );
    } catch (e) {
      dispatch(
        setNotification({
          message: `Ошибка при изменении квартиры. 
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
      <div>Изменить квартиру {apart.name}</div>

      <AdminGalery images={apart.images} item={apart} type={"apart"} />
      <ImageUpload id={apartId} type={"apart"} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="windows__update-list--points"
        encType="multipart/form-data"
      >
        {apartFields.map((field, index) => {
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
          );
        })}

        <button type="submit" className="save">
          Сохранить квартиру
        </button>
      </form>
    </div>
  );
}
