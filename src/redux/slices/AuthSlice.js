import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const authLogin = createAsyncThunk("auth/login", async (data) => {
  const response = await axios.post(`${api}/auth/login`, data);
  console.log(response.data);
  return response.data;
});

export const authLogout = createAsyncThunk("auth/logout", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${api}/auth/logout`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
});

const initialState = {
  auth: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle action authLogin
    builder.addCase(authLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // Handle action authLogout
    builder.addCase(authLogout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authLogout.fulfilled, (state) => {
      state.loading = false;
      state.auth = null;
      console.log("berhasil login");
      localStorage.removeItem("token");
    });
    builder.addCase(authLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
