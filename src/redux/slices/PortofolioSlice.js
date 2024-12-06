import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const fetchAllPortofolio = createAsyncThunk(
  "portofolio/fetchAllPortofolio",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/portfolio`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data.data;
  }
);

export const addPortofolio = createAsyncThunk(
  "portofolio/addPortofolio",
  async (data) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${api}/portfolio`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deletePortofolio = createAsyncThunk(
  "portofolio/deletePortofolio",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${api}/portfolio/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchPortofolioById = createAsyncThunk(
  "portofolio/fetchPortofolioById",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/portfolio/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("1", response.data);
    return response.data.data;
  }
);

export const updatePortofolio = createAsyncThunk(
  "portofolio/updatePortofolio",
  async ({ id, data }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${api}/portfolio/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("hasil1", action.payload);
    return response.data;
  }
);

const initialState = {
  portofolios: [],
  portofolio: {},
  loading: false,
  error: null,
};
const PortofolioSlice = createSlice({
  name: "Portofolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all portofolios
    builder.addCase(fetchAllPortofolio.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllPortofolio.fulfilled, (state, action) => {
      state.loading = false;
      state.portofolios = action.payload;
    });
    builder.addCase(fetchAllPortofolio.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch portofolio by ID
    builder.addCase(fetchPortofolioById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPortofolioById.fulfilled, (state, action) => {
      state.loading = false;
      state.portofolio = action.payload; // Simpan detail portofolio
    });
    builder.addCase(fetchPortofolioById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add portofolio
    builder.addCase(addPortofolio.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addPortofolio.fulfilled, (state, action) => {
      state.loading = false;
      state.portofolios.push(action.payload);
    });
    builder.addCase(addPortofolio.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete portofolio
    builder.addCase(deletePortofolio.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePortofolio.fulfilled, (state, action) => {
      state.loading = false;
      // Hapus portofolio dari state
      state.portofolios = state.portofolios.filter(
        (portofolio) => portofolio._id !== action.payload._id
      );
    });
    builder.addCase(deletePortofolio.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update portofolio
    builder.addCase(updatePortofolio.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePortofolio.fulfilled, (state, action) => {
      state.loading = false;
      // Perbarui portofolio di state
      state.portofolios = state.portofolios.map((portofolio) =>
        portofolio._id === action.payload._id ? action.payload : portofolio
      );
      console.log("hasil", action.payload);
    });
    builder.addCase(updatePortofolio.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default PortofolioSlice.reducer;
