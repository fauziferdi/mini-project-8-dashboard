import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SidebarComponent from "./components/SidebarComponent";
import FormsPage from "./pages/FormsPage";

function App() {
  return (
    <Router>
      <div className="grid grid-cols-[230px,1fr] gap-4">
        <div className="sticky top-0">
          <SidebarComponent />
        </div>
        <div className="container mx-auto pt-10">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/forms" element={<FormsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
