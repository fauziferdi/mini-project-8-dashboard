import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_API_TOKEN;

export const fetchAllTestimonial = createAsyncThunk(
  "blog/fetchAllTestimonial",
  async () => {
    const response = await axios.get(`${api}/testimonial`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data.data;
  }
);

const initialState = {
  testimonials: [],
  loading: false,
  error: null,
};

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTestimonial.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllTestimonial.fulfilled, (state, action) => {
      state.loading = false;
      state.testimonials = action.payload;
      console.log(state.testimonials);
    });
    builder.addCase(fetchAllTestimonial.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default testimonialSlice.reducer;
