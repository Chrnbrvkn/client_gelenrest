import { createSlice } from '@reduxjs/toolkit';
import { fetchRoomsAsync } from './roomsFetch';

const initialState = {
  allRooms: [],
  roomsByHouseId: {},
  status: 'idle',
  error: null,
};


const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoomsAsync.fulfilled, (state, action) => {
      const { houseId, roomsWithImages } = action.payload;

      state.roomsByHouseId[houseId] = roomsWithImages;
  
      // Комбинируем текущий список всех комнат с новыми комнатами
      const combinedRooms = [...state.allRooms, ...roomsWithImages];
  
      // Фильтруем комбинированный список, чтобы удалить дубликаты
      // Мы итерируемся по комбинированному массиву комнат
      // Для каждой комнаты проверяем, является ли ее индекс в массиве первым ее появлением
      // Если да, то включаем комнату в итоговый массив, иначе — исключаем
      state.allRooms = combinedRooms.filter((room, index, self) => {
        return index === self.findIndex((t) => t.id === room.id);
      });
    });
  },
  
});

export default roomsSlice.reducer;
