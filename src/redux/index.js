import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import portofoliReducer from "./slices/PortofolioSlice";
import blogReducer from "./slices/BlogSlice";
import testmonialReducer from "./slices/TestimonialSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    portofolios: portofoliReducer,
    blogs: blogReducer,
    testimonials: testmonialReducer,
  },
});
