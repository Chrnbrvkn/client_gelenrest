import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorMessage: null,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { setErrorMessage, clearErrorMessage } = errorSlice.actions;

export default errorSlice.reducer;
