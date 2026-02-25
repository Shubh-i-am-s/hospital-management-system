import { useState } from "react";

export default function Billing() {
  const [selectedBill, setSelectedBill] = useState(null);

  const [bills] = useState([
    {
      appointmentId: 1,
      billNumber: 1,
      patient: "Rahul Sharma",
      doctor: "Dr. Mehta",
      amount: 2000,
      status: "Paid",
      date: "25 Feb 2026",
    },
    {
      appointmentId: 2,
      billNumber: 1,
      patient: "Priya Singh",
      doctor: "Dr. Sharma",
      amount: 3500,
      status: "Pending",
      date: "26 Feb 2026",
    },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Billing</h2>

      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Appointment ID</th>
            <th className="p-3 text-left">Bill No</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">See Bill</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((b, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{b.appointmentId}</td>
              <td className="p-3">{b.billNumber}</td>
              <td className="p-3">₹{b.amount}</td>
              <td className="p-3">{b.status}</td>
              <td className="p-3">
                <button
                  onClick={() => setSelectedBill(b)}
                  className="bg-slate-900 px-4 py-1 rounded-md text-white hover:bg-slate-700"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* BILL MODAL */}
      {selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-[500px] rounded-xl shadow-xl p-6 relative">
            <button
              onClick={() => setSelectedBill(null)}
              className="absolute top-3 right-4 text-gray-500 text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 border-b pb-2">
              Hospital Invoice
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Patient:</strong> {selectedBill.patient}
              </p>
              <p>
                <strong>Doctor:</strong> {selectedBill.doctor}
              </p>
              <p>
                <strong>Appointment ID:</strong> {selectedBill.appointmentId}
              </p>
              <p>
                <strong>Bill Number:</strong> {selectedBill.billNumber}
              </p>
              <p>
                <strong>Date:</strong> {selectedBill.date}
              </p>
              <p>
                <strong>Status:</strong> {selectedBill.status}
              </p>

              <hr className="my-3" />

              <p className="text-lg font-bold">
                Total Amount: ₹{selectedBill.amount}
              </p>
            </div>

            <button
              className="mt-6 w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-700"
              onClick={() => alert("Printing Bill...")}
            >
              Print Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
