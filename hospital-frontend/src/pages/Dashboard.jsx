import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import Card from "../components/Card";

export default function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    revenue: "₹0",
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/stats`)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
      });
  }, []);

  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      <Card title="Total Patients" value={stats.patients.toString()} />
      <Card title="Total Doctors" value={stats.doctors.toString()} />
      <Card title="Appointments" value={stats.appointments.toString()} />
      <Card title="Revenue" value={stats.revenue} />
    </div>
  );
}
