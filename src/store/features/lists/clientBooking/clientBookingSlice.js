import { createSlice } from '@reduxjs/toolkit';
import { fetchClientBooking } from './clientBookingFetch';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const clientBookingSlice = createSlice({
  name: 'clientBooking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClientBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(fetchClientBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default clientBookingSlice.reducer;
