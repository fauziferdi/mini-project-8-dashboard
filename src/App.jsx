import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SidebarComponent from "./components/SidebarComponent";
import PortofolioPage from "./pages/PortofolioPage";
import UserPage from "./pages/UserPage";
import BlogPage from "./pages/BlogPage";
import TestimonialPage from "./pages/TestimonialPage";

function App() {
  return (
    <Router>
      <div className="grid grid-cols-[230px,1fr] gap-4">
        <div className="sticky top-0">
          <SidebarComponent />
        </div>
        <div className="container pt-10 pr-5 mx-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/portofolio" element={<PortofolioPage />} />
            <Route path="/blog" element={<ListBlogComponent />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/testimonial" element={<TestimonialPage />} />
            <Route path="/portofolio/:id" element={<PortofolioPage />} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/testimonial/:id" element={<TestimonialPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
