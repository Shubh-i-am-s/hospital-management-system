import Card from "../components/Card";

export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      <Card title="Total Patients" value="120" />
      <Card title="Total Doctors" value="25" />
      <Card title="Appointments" value="75" />
      <Card title="Revenue" value="₹1,25,000" />
    </div>
  );
}
