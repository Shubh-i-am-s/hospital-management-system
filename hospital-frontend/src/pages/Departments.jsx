import { useState } from "react";

export default function Departments() {
  const [departments] = useState([
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Neurology" },
    { id: 3, name: "Orthopedics" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Departments</h2>

      <ul className="bg-white shadow rounded-xl divide-y">
        {departments.map((d) => (
          <li key={d.id} className="p-4">
            {d.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
