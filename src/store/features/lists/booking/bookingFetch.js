
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBooking } from '../../../../api/bookingApi';

export const fetchBooking = createAsyncThunk('booking/fetchBooking', async () => {
  const response = await getBooking();
  return { data: response };
});
