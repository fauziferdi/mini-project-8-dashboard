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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [auth]);

  const PrivateRoute = ({ children }) => {
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
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/portofolio"
                  element={
                    <PrivateRoute>
                      <PortofolioPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <PrivateRoute>
                      <BlogPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user"
                  element={
                    <PrivateRoute>
                      <UserPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/testimonial"
                  element={
                    <PrivateRoute>
                      <TestimonialPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/portofolio/add"
                  element={
                    <PrivateRoute>
                      <PortofolioPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/portofolio/edit/:id"
                  element={
                    <PrivateRoute>
                      <PortofolioPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/blog/add"
                  element={
                    <PrivateRoute>
                      <BlogPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/blog/edit/:id"
                  element={
                    <PrivateRoute>
                      <BlogPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/:id"
                  element={
                    <PrivateRoute>
                      <UserPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/edit/:id"
                  element={
                    <PrivateRoute>
                      <UserPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/add"
                  element={
                    <PrivateRoute>
                      <UserPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/testimonial/add"
                  element={
                    <PrivateRoute>
                      <TestimonialPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/testimonial/edit/:id"
                  element={
                    <PrivateRoute>
                      <TestimonialPage />
                    </PrivateRoute>
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
