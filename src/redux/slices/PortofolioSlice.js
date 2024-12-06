import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_API_TOKEN;

export const fetchAllPortofolio = createAsyncThunk(
  "portofolio/fetchAllPortofolio",
  async () => {
    const response = await axios.get(`${api}/portfolio`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data.data;
  }
);

const initialState = {
  portofolios: [],
  loading: false,
  error: null,
};
const PortofolioSlice = createSlice({
  name: "Portofolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPortofolio.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllPortofolio.fulfilled, (state, action) => {
      state.loading = false;
      state.portofolios = action.payload;
      console.log(state.portofolios);
    });
    builder.addCase(fetchAllPortofolio.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default PortofolioSlice.reducer;
