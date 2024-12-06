import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_API_TOKEN;

export const fetchAllBlog = createAsyncThunk("blog/fetchAllBlog", async () => {
  const response = await axios.get(`${api}/blogs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data.data;
});

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
      console.log(state.blogs);
    });
    builder.addCase(fetchAllBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default blogSlice.reducer;
