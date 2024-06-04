
import { deleteApartPictureAsync } from "../../../store/features/lists/aparts/apartsFetch";
import { deleteHousePictureAsync } from "../../../store/features/lists/houses/housesFetch";
import { deleteRoomPictureAsync } from "../../../store/features/lists/rooms/roomsFetch";
import { useDispatch } from "react-redux";
import { setNotification } from "../../../store/features/notification/notificationSlice";


export const useAdminImages = (item, type) => {
  const dispatch = useDispatch();

  const deleteImage = {
    apart: deleteApartPictureAsync,
    house: deleteHousePictureAsync,
    room: deleteRoomPictureAsync,
  };

  const handleDeleteImage = (imageId) => {
    try {
      dispatch(deleteImage[type]({ [`${type}Id`]: item.id, imageId }));
      dispatch(
        setNotification({
          message: `Фотография удалена.`,
          type: "success",
        })
      );
    } catch (e) {
      dispatch(
        setNotification({
          message: `Ошибка при удалении фотографии. 
        ${e.message}`,
          type: "error",
        })
      );
      console.log(e);
    }
  };
  return {
    handleDeleteImage,
  };
}