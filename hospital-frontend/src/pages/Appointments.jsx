import { useEffect, useState } from "react";
import axios from "axios";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
  });

  const fetchAppointments = async () => {
    const res = await axios.get("http://localhost:8000/appointments");
    setAppointments(res.data);
  };

  const fetchPatients = async () => {
    const res = await axios.get("http://localhost:8000/patients");
    setPatients(res.data);
  };

  const fetchDoctors = async () => {
    const res = await axios.get("http://localhost:8000/doctors");
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8000/appointments", formData);

    fetchAppointments();

    setFormData({
      patient_id: "",
      doctor_id: "",
      appointment_date: "",
      appointment_time: "",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md grid grid-cols-2 gap-4 mb-8"
      >
        <select
          name="patient_id"
          value={formData.patient_id}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.patient_id} value={p.patient_id}>
              {p.p_name}
            </option>
          ))}
        </select>

        <select
          name="doctor_id"
          value={formData.doctor_id}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.doctor_id} value={d.doctor_id}>
              {d.doctor_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="time"
          name="appointment_time"
          value={formData.appointment_time}
          onChange={handleChange}
          className="p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="col-span-2 bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-700"
        >
          Book Appointment
        </button>
      </form>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Patient</th>
            <th className="p-3 text-left">Doctor</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.appointment_id} className="border-t">
              <td className="p-3">{a.p_name}</td>
              <td className="p-3">{a.doctor_name}</td>
              <td className="p-3">{a.appointment_date}</td>
              <td className="p-3">{a.appointment_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
