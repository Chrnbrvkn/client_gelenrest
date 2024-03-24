import { createSlice } from '@reduxjs/toolkit';
import { fetchRoomsAsync } from './roomsFetch';

const initialState = {
  data: {},
  status: 'idle',
  error: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchRoomsAsync.fulfilled, (state, action) => {
      const { houseId, roomsWithImages } = action.payload;
      state.data[houseId] = roomsWithImages;
    })
  },
});

export default roomsSlice.reducer;
