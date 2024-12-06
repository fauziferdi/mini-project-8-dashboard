import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const fetchAllBlog = createAsyncThunk("blog/fetchAllBlog", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${api}/blogs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data.data;
});

export const addBlog = createAsyncThunk("blog/addBlog", async (data) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${api}/blogs`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${api}/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const fetchBlogById = createAsyncThunk(
  "blog/fetchBlogById",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, data }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${api}/blogs/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const initialState = {
  blogs: [],
  blog: {},
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //fetch data
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

    //fetch data by id
    builder.addCase(fetchBlogById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogById.fulfilled, (state, action) => {
      state.loading = false;
      state.blog = action.payload;
      console.log(state.blog);
    });
    builder.addCase(fetchBlogById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //add data
    builder.addCase(addBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs.push(action.payload);
    });
    builder.addCase(addBlog.rejected, (state) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //delete data
    builder.addCase(deleteBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = state.blogs.filter(
        (blog) => blog._id !== action.payload._id
      );
    });
    builder.addCase(deleteBlog.rejected, (state) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //update data
    builder.addCase(updateBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = state.blogs.map((blog) =>
        blog._id === action.payload._id ? action.payload : blog
      );
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default blogSlice.reducer;
