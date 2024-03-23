
import { createSlice } from '@reduxjs/toolkit';
import { loginAsync, validateTokenAsync } from './authThunk';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: localStorage.getItem('jwtToken') || null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isSubmitting: false,
  },
  reducers: {
    logout: (state) => {
      state.authToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('jwtToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSubmitting = false;
        state.authToken = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('jwtToken', action.payload);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isSubmitting = false;
        state.error = action.payload;
      })
      .addCase(validateTokenAsync.fulfilled, (state, action) => {
        if (action.payload.message === "Токен действителен") {
          state.isAuthenticated = true;
          if (action.payload.token) {
            state.authToken = action.payload.token;
            localStorage.setItem('jwtToken', action.payload.token);
          }
        } else {
          state.isAuthenticated = false;
        }
      })
      .addCase(validateTokenAsync.rejected, (state, action) => {

        state.error = action.payload;
        state.authToken = null;
        state.isAuthenticated = false;
        localStorage.removeItem('jwtToken');
      })

  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
