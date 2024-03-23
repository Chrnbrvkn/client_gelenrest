
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers } from "../../../../api/usersApi";


export const fetchUsers = createAsyncThunk('Users/fetchUsers', async () => {
  const response = await getUsers();
  return { data: response, images };
});


