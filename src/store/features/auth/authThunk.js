
import { createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, validateToken } from "../../../api/usersApi";

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await signIn(credentials);
      return response.token;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const validateTokenAsync = createAsyncThunk(
  'auth/validateToken',
  async (_, { getState, rejectWithValue }) => {
    const { authToken } = getState().auth;
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const now = new Date().getTime();
    if (!tokenExpiration || now >= Number(tokenExpiration)) {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('jwtTokenExpiration')
      return rejectWithValue('Token Expired');
    }
    try {
      const response = await validateToken(authToken);
      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);