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
    try {
      const { authToken } = getState().auth;
      const response = await validateToken(authToken);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);