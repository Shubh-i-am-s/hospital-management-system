import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [deptName, setDeptName] = useState("");

  const fetchDepartments = () => {
    axios
      .get(`${API_BASE_URL}/departments`)
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deptName.trim()) return;

    try {
      await axios.post(`${API_BASE_URL}/departments`, {
        dept_name: deptName,
      });
      setDeptName("");
      fetchDepartments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Departments</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md flex gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Department Name"
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
          className="p-3 border rounded-lg flex-1"
          required
        />
        <button
          type="submit"
          className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition"
        >
          Add Department
        </button>
      </form>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-700">ID</th>
              <th className="p-4 font-semibold text-slate-700">
                Department Name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {departments.length > 0 ? (
              departments.map((d) => (
                <tr key={d.department_id} className="hover:bg-slate-50 transition">
                  <td className="p-4">{d.department_id}</td>
                  <td className="p-4">{d.dept_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-4 text-center text-gray-500">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
