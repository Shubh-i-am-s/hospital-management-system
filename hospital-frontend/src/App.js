import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Billing from "./pages/Billing";
import Departments from "./pages/Departments";
import Login from "./pages/Login";
import Receptionist from "./pages/Receptionist";

// Defined outside App so React doesn't treat it as a new component on every render
const Layout = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-slate-100 min-h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/patients"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <Patients />
            </Layout>
          }
        />

        <Route
          path="/doctors"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <Doctors />
            </Layout>
          }
        />

        <Route
          path="/appointments"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <Appointments />
            </Layout>
          }
        />

        <Route
          path="/billing"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <Billing />
            </Layout>
          }
        />

        <Route
          path="/departments"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <Departments />
            </Layout>
          }
        />

        <Route
          path="/receptionist"
          element={
            <Layout isLoggedIn={isLoggedIn}>
              <Receptionist />
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
