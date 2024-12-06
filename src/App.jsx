import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SidebarComponent from "./components/SidebarComponent";
import PortofolioPage from "./pages/PortofolioPage";
import UserPage from "./pages/UserPage";
import BlogPage from "./pages/BlogPage";
import TestimonialPage from "./pages/TestimonialPage";
import LoginFormComponent from "./components/LoginFormComponent";
import { useSelector } from "react-redux";
import "flowbite";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [auth]);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {isAuthenticated ? (
          <div className="grid grid-cols-[230px,1fr] gap-4 w-full  mx-auto">
            <div className="sticky top-0">
              <SidebarComponent />
            </div>
            <div className="container p-10 mx-auto">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/portofolio"
                  element={
                    <ProtectedRoute>
                      <PortofolioPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <ProtectedRoute>
                      <BlogPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user"
                  element={
                    <ProtectedRoute>
                      <UserPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/testimonial"
                  element={
                    <ProtectedRoute>
                      <TestimonialPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/portofolio/add"
                  element={
                    <ProtectedRoute>
                      <PortofolioPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/portofolio/edit/:id"
                  element={
                    <ProtectedRoute>
                      <PortofolioPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog/add"
                  element={
                    <ProtectedRoute>
                      <BlogPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog/edit/:id"
                  element={
                    <ProtectedRoute>
                      <BlogPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/testimonial/add"
                  element={
                    <ProtectedRoute>
                      <TestimonialPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/testimonial/edit/:id"
                  element={
                    <ProtectedRoute>
                      <TestimonialPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <ProtectedRoute>
                      <ContactPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        ) : (
          <div className="container p-5 mx-auto">
            <Routes>
              <Route path="/login" element={<LoginFormComponent />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
