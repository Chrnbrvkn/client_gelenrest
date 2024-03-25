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
      const combinedRooms = [...state.allRooms, ...roomsWithImages];
      state.allRooms = combinedRooms.filter((room, index, self) => {
        return index === self.findIndex((t) => t.id === room.id);
      });
    });
  },
});

export default roomsSlice.reducer;
