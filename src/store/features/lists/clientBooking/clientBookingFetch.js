
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getReservedDates } from '../../../../api/bookingApi';

export const fetchClientBooking = createAsyncThunk('clientBooking/fetchClientBooking', async () => {
  const response = await getReservedDates();
  return { data: response };
});
