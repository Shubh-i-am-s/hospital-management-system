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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const Layout = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
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
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/patients"
          element={
            <Layout>
              <Patients />
            </Layout>
          }
        />

        <Route
          path="/doctors"
          element={
            <Layout>
              <Doctors />
            </Layout>
          }
        />

        <Route
          path="/appointments"
          element={
            <Layout>
              <Appointments />
            </Layout>
          }
        />

        <Route
          path="/billing"
          element={
            <Layout>
              <Billing />
            </Layout>
          }
        />

        <Route
          path="/departments"
          element={
            <Layout>
              <Departments />
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
