import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllRooms, createRoom, updateRoom, deleteRoom, getRoomImages, uploadRoomPictures, deleteRoomPicture, getRooms } from '../../../../api/roomsApi'
import { setLoading } from '../../loading/loadingSlice'
import { setErrorMessage } from '../../errors/errorsSlice'

export const fetchAllRoomsAsync = createAsyncThunk('rooms/fetchAll', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const rooms = await getAllRooms();
    dispatch(setLoading(false));
    return rooms;
  } catch (e) {
    dispatch(setErrorMessage(e.message));
    dispatch(setLoading(false));
    return [];
  }
});

export const fetchRoomsAsync = createAsyncThunk('rooms/fetchRooms', async (houseId, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const rooms = await getRooms(houseId)
    const roomsWithImages = await Promise.all(rooms
      .map(async room => {
        const images = await getRoomImages(room.id)
        return { ...room, images }
      }))
    return { houseId, roomsWithImages }
  } catch (e) {
    dispatch(setErrorMessage(e.message))
  } finally {
    dispatch(setLoading(false))
  }
})


export const addRoomAsync = createAsyncThunk(
  'rooms/addRoom',
  async ({ formData, houseId, pictures }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      formData.append('houseId', houseId);
      const createdRoom = await createRoom(houseId, formData);

      if (pictures.length > 0) {
        await uploadRoomPictures(pictures, createdRoom.id);
      }

      return createdRoom;
    } catch (e) {
      dispatch(setErrorMessage(e.message));
    } finally {
      dispatch(fetchRoomsAsync(houseId));
      dispatch(setLoading(false));
    }
  }
);


export const updateRoomAsync = createAsyncThunk('rooms/updateRoom', async ({ houseId, roomId, roomData }, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const updatedRoom = await updateRoom(houseId, roomId, roomData)
    dispatch(fetchRoomsAsync(updatedRoom.houseId))
    return updatedRoom
  } catch (e) {
    dispatch(setErrorMessage(e.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const deleteRoomAsync = createAsyncThunk('rooms/deleteRoom',
  async ({ roomId, houseId }, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      await deleteRoom(houseId, roomId)
    } catch (e) {
      dispatch(setErrorMessage(e.message))
    } finally {
      dispatch(fetchRoomsAsync(houseId))
      dispatch(setLoading(false))
    }
  })

export const uploadRoomImagesAsync = createAsyncThunk('rooms/uploadRoomImages', async ({ roomId, pictures }, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    if (pictures.length > 0) {
      await uploadRoomPictures(pictures, roomId);
    }
    return roomId;
  } catch (e) {
    dispatch(setErrorMessage(e));
  } finally {
    dispatch(fetchRoomsAsync(roomId));
    dispatch(setLoading(false));
  }
});


export const deleteRoomPictureAsync = createAsyncThunk('rooms/deleteRoomPicture', async ({ houseId, roomId, imageId }, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    await deleteRoomPicture(roomId, imageId)
  } catch (e) {
    dispatch(setErrorMessage(e.message))
  } finally {
    dispatch(fetchRoomsAsync(houseId))
    dispatch(setLoading(false))
  }
})