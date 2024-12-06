import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const fetchAllContact = createAsyncThunk(
  "contact/fetchAllContact",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/contact?page=1&limit=8`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data.data;
  }
);

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all contacts
    builder.addCase(fetchAllContact.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
    });
    builder.addCase(fetchAllContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default contactSlice.reducer;
