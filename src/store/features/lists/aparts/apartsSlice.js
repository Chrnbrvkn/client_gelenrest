import { createSlice } from '@reduxjs/toolkit';
import { fetchApartsAsync, uploadApartImagesAsync } from './apartsFetch';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const apartsSlice = createSlice({
  name: 'aparts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
  },
});

export default apartsSlice.reducer;
