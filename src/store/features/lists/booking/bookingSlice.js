import { createSlice } from '@reduxjs/toolkit';
import { fetchBookingAsync } from './bookingFetch';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
  },
});

export default bookingSlice.reducer;
