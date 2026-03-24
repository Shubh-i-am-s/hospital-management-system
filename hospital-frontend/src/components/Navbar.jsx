import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h2 className="text-xl font-semibold">Hospital Dashboard</h2>
      <Link
        to="/receptionist"
        className="text-gray-600 hover:text-slate-900 transition font-medium"
      >
        Receptionist
      </Link>
    </div>
  );
}
