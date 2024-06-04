import { createSlice } from '@reduxjs/toolkit';
import { fetchAllRoomsAsync, fetchRoomsAsync, deleteRoomPictureAsync, deleteRoomAsync } from './roomsFetch';

const initialState = {
  allRooms: [],
  status: 'idle',
  error: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoomsAsync.fulfilled, (state, action) => {
        // Полагаем, что action.payload это массив всех комнат
        state.allRooms = action.payload;
      })
      .addCase(fetchRoomsAsync.fulfilled, (state, action) => {
        const { houseId, roomsWithImages } = action.payload;
        // Удаляем старые комнаты этого дома
        state.allRooms = state.allRooms.filter(room => room.houseId !== houseId);
        // Добавляем новые комнаты
        state.allRooms = [...state.allRooms, ...roomsWithImages];
      })
      .addCase(deleteRoomAsync.fulfilled, (state, action) => {
        const { roomId } = action.meta.arg;
        // Удаляем комнату по roomId
        state.allRooms = state.allRooms.filter(room => room.id !== roomId);
      })
      .addCase(deleteRoomPictureAsync.fulfilled, (state, action) => {
        const { roomId, imageId } = action.meta.arg;
        // Находим комнату по id и удаляем изображение
        const room = state.allRooms.find(room => room.id === roomId);
        if (room && room.images) {
          room.images = room.images.filter(image => image.id !== imageId);
        }
      });
  },
});

export default roomsSlice.reducer;
