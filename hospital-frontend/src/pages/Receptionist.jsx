import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function Receptionist() {
  const [receptionists, setReceptionists] = useState([]);

  useEffect(() => {
    // Assuming there's an endpoint or I'll add one
    axios
      .get(`${API_BASE_URL}/receptionists`)
      .then((res) => setReceptionists(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Receptionists</h2>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-700">ID</th>
              <th className="p-4 font-semibold text-slate-700">Name</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {receptionists.length > 0 ? (
              receptionists.map((r) => (
                <tr key={r.r_id} className="hover:bg-slate-50 transition">
                  <td className="p-4">{r.r_id}</td>
                  <td className="p-4 text-slate-400 italic">{r.r_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No receptionists found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
