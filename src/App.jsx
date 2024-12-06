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
          <div className="grid grid-cols-[230px,1fr] gap-4 w-full max-w-7xl mx-auto">
            <div className="sticky top-0">
              <SidebarComponent />
            </div>
            <div className="container pt-10 pr-5">
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
                  path="/portofolio/:id"
                  element={
                    <PrivateRoute>
                      <PortofolioPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/blog/:id"
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
                  path="/testimonial/:id"
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
