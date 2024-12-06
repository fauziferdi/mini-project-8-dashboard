import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const fetchAllTestimonial = createAsyncThunk(
  "testimonial/fetchAllTestimonial", // Ubah nama action type
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/testimonial`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data.data;
  }
);

export const addTestimonial = createAsyncThunk(
  // Tambahkan action creator untuk menambah testimonial
  "testimonial/addTestimonial",
  async (data) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${api}/testimonial`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteTestimonial = createAsyncThunk(
  // Tambahkan action creator untuk menghapus testimonial
  "testimonial/deleteTestimonial",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${api}/testimonial/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchTestimonialById = createAsyncThunk(
  // Tambahkan action creator untuk mengambil testimonial berdasarkan ID
  "testimonial/fetchTestimonialById",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/testimonial/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  }
);

export const updateTestimonial = createAsyncThunk(
  // Tambahkan action creator untuk mengupdate testimonial
  "testimonial/updateTestimonial",
  async ({ id, data }) => {
    const token = localStorage.getItem("token"); // Perbaiki: Gunakan localStorage.getItem()
    const response = await axios.put(`${api}/testimonial/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const initialState = {
  testimonials: [],
  testimonial: {}, // Tambahkan state untuk menyimpan detail testimonial
  loading: false,
  error: null,
};

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all testimonials
    builder.addCase(fetchAllTestimonial.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllTestimonial.fulfilled, (state, action) => {
      state.loading = false;
      state.testimonials = action.payload;
    });
    builder.addCase(fetchAllTestimonial.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch testimonial by ID
    builder.addCase(fetchTestimonialById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTestimonialById.fulfilled, (state, action) => {
      state.loading = false;
      state.testimonial = action.payload;
    });
    builder.addCase(fetchTestimonialById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add testimonial
    builder.addCase(addTestimonial.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTestimonial.fulfilled, (state, action) => {
      state.loading = false;
      state.testimonials.push(action.payload);
    });
    builder.addCase(addTestimonial.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete testimonial
    builder.addCase(deleteTestimonial.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTestimonial.fulfilled, (state, action) => {
      state.loading = false;
      state.testimonials = state.testimonials.filter(
        (testimonial) => testimonial._id !== action.payload._id
      );
    });
    builder.addCase(deleteTestimonial.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update testimonial
    builder.addCase(updateTestimonial.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTestimonial.fulfilled, (state, action) => {
      state.loading = false;
      state.testimonials = state.testimonials.map((testimonial) =>
        testimonial._id === action.payload._id ? action.payload : testimonial
      );
    });
    builder.addCase(updateTestimonial.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default testimonialSlice.reducer;
