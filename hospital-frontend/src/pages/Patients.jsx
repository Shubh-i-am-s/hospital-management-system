import { useEffect, useState } from "react";
import axios from "axios";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    p_name: "",
    gender: "",
    age: "",
    phone: "",
    address: "",
  });

  // Fetch patients from backend
  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:8000/patients");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/patients", formData);

      fetchPatients(); // Refresh table after insert

      setFormData({
        p_name: "",
        gender: "",
        age: "",
        phone: "",
        address: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Patients</h2>

      {/* ADD PATIENT FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md grid grid-cols-2 gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Name"
          name="p_name"
          value={formData.p_name}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          placeholder="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Age"
          name="age"
          value={formData.age}
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

        <input
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="p-3 border rounded-lg col-span-2"
        />

        <button
          type="submit"
          className="col-span-2 bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-700"
        >
          Add Patient
        </button>
      </form>

      {/* PATIENT TABLE */}
      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Address</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.patient_id} className="border-t">
              <td className="p-3">{p.patient_id}</td>
              <td className="p-3">{p.p_name}</td>
              <td className="p-3">{p.gender}</td>
              <td className="p-3">{p.age}</td>
              <td className="p-3">{p.phone}</td>
              <td className="p-3">{p.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
