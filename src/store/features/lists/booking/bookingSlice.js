import { createSlice } from '@reduxjs/toolkit';
import { fetchBooking } from './bookingFetch';

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
      .addCase(fetchBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(fetchBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default bookingSlice.reducer;
