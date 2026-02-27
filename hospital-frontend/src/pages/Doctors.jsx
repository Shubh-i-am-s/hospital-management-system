import { useEffect, useState } from "react";
import axios from "axios";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    doctor_name: "",
    specialization: "",
    phone: "",
    department_id: "",
  });

  const fetchDoctors = async () => {
    const res = await axios.get(
      "https://hospital-management-system-1u7z.onrender.com/doctors",
    );
    setDoctors(res.data);
  };

  const fetchDepartments = async () => {
    const res = await axios.get(
      "https://hospital-management-system-1u7z.onrender.com/departments",
    );
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "https://hospital-management-system-1u7z.onrender.com/doctors",
      formData,
    );

    fetchDoctors();

    setFormData({
      doctor_name: "",
      specialization: "",
      phone: "",
      department_id: "",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Doctors</h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md grid grid-cols-2 gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Doctor Name"
          name="doctor_name"
          value={formData.doctor_name}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          placeholder="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />

        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />

        <select
          name="department_id"
          value={formData.department_id}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.department_id} value={d.department_id}>
              {d.dept_name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="col-span-2 bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-700"
        >
          Add Doctor
        </button>
      </form>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Specialization</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Department</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.doctor_id} className="border-t">
              <td className="p-3">{d.doctor_name}</td>
              <td className="p-3">{d.specialization}</td>
              <td className="p-3">{d.phone}</td>
              <td className="p-3">{d.dept_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
