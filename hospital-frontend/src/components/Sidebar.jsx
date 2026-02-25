import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-slate-700 text-white"
        : "hover:bg-slate-800 text-gray-300"
    }`;

  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">Hospital</h1>

      <nav className="space-y-2">
        <Link to="/" className={linkClass("/")}>
          Dashboard
        </Link>

        <Link to="/patients" className={linkClass("/patients")}>
          Patients
        </Link>

        <Link to="/doctors" className={linkClass("/doctors")}>
          Doctors
        </Link>

        <Link to="/appointments" className={linkClass("/appointments")}>
          Appointments
        </Link>

        <Link to="/billing" className={linkClass("/billing")}>
          Billing
        </Link>

        <Link to="/departments" className={linkClass("/departments")}>
          Departments
        </Link>
      </nav>
    </div>
  );
}
