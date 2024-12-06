import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_API_TOKEN;

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    const response = await axios.get(`${api}/users?page=1&limit=8`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data.data;
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      console.log(state.users);
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default UserSlice.reducer;
