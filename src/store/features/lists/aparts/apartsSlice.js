import { createSlice } from '@reduxjs/toolkit';
import { fetchAparts } from './apartsFetch';

const initialState = {
  data: [],
  images: [],
  status: 'idle',
  error: null,
}

const apartsSlice = createSlice({
  name: 'aparts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAparts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAparts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.images = action.payload.images;
      })
      .addCase(fetchAparts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default apartsSlice.reducer;