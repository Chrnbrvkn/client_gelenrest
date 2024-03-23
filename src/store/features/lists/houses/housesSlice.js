import { createSlice } from '@reduxjs/toolkit';
import { fetchHousesAsync} from './housesFetch';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHousesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
  },
});

export default housesSlice.reducer;
