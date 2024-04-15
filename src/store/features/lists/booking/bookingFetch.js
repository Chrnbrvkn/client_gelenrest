
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBooking, createBooking, updateBooking, deleteBooking } from '../../../../api/bookingApi';
import { setErrorMessage } from '../../errors/errorsSlice';
import { setLoading } from '../../loading/loadingSlice';

export const fetchBookingAsync = createAsyncThunk('booking/fetchBooking', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const booking = await getBooking();
    return booking;
  } catch (e) {
    dispatch(setErrorMessage(e))
  } finally {
    dispatch(setLoading(false));
  }
});

export const createBookingAsync = createAsyncThunk('booking/createBooking', async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const booking = await createBooking(JSON.stringify(data));
    return booking;
  } catch (e) {
    dispatch(setErrorMessage(e))
  } finally {
    dispatch(fetchBookingAsync())
    dispatch(setLoading(false));
  }
})

export const updateBookingAsync = createAsyncThunk('booking/updateBooking', async ({bookingId, data}, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    console.log('bookingId');
    console.log(bookingId);
    const booking = await updateBooking(bookingId, data);
    return booking;
  } catch (e) {
    dispatch(setErrorMessage(e))
  } finally {
    dispatch(fetchBookingAsync())
    dispatch(setLoading(false));
  }
})

export const deleteBookingAsync = createAsyncThunk('booking/deleteBooking', async (bookingId, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const booking = await deleteBooking(bookingId);
    return booking;
  } catch (e) {
    dispatch(setErrorMessage(e))
  } finally {
    dispatch(fetchBookingAsync())
    dispatch(setLoading(false));
  }
})
