import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../../../api/usersApi";
import { setErrorMessage } from "../../errors/errorsSlice";
import { setLoading } from "../../loading/loadingSlice";

export const fetchUsers = createAsyncThunk(
  "Users/fetchUsers",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      return await getUsers();
    } catch (e) {
      dispatch(setErrorMessage(e));
      dispatch(setLoading(false));
    }
  }
);
