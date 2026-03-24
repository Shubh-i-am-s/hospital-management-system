import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function Billing() {
  const [selectedBill, setSelectedBill] = useState(null);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/billing`)
      .then((res) => setBills(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Billing</h2>

      <table className="w-full bg-white shadow rounded-xl text-left border-collapse overflow-hidden">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="p-4 font-semibold text-slate-700">Appointment ID</th>
            <th className="p-4 font-semibold text-slate-700">Bill No</th>
            <th className="p-4 font-semibold text-slate-700">Patient</th>
            <th className="p-4 font-semibold text-slate-700">Amount</th>
            <th className="p-4 font-semibold text-slate-700">Date</th>
            <th className="p-4 font-semibold text-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y text-slate-600">
          {bills.length > 0 ? (
            bills.map((b, index) => (
              <tr key={index} className="hover:bg-slate-50 transition">
                <td className="p-4">{b.appointment_id}</td>
                <td className="p-4">{b.bill_number}</td>
                <td className="p-4">{b.p_name}</td>
                <td className="p-4">₹{b.amount}</td>
                <td className="p-4">{new Date(b.appointment_date).toLocaleDateString()}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => setSelectedBill(b)}
                    className="bg-slate-900 px-4 py-2 rounded-lg text-white hover:bg-slate-700 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-400">
                No bills found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* BILL MODAL */}
      {selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-2xl shadow-2xl p-8 relative">
            <button
              onClick={() => setSelectedBill(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl transition"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 border-b pb-4 text-slate-800">
              Hospital Invoice
            </h2>

            <div className="space-y-4 text-slate-600">
              <div className="flex justify-between">
                <strong>Patient:</strong>
                <span>{selectedBill.p_name}</span>
              </div>
              <div className="flex justify-between">
                <strong>Doctor:</strong>
                <span>{selectedBill.doctor_name}</span>
              </div>
              <div className="flex justify-between">
                <strong>Appointment ID:</strong>
                <span>{selectedBill.appointment_id}</span>
              </div>
              <div className="flex justify-between">
                <strong>Bill Number:</strong>
                <span>{selectedBill.bill_number}</span>
              </div>
              <div className="flex justify-between">
                <strong>Date:</strong>
                <span>{new Date(selectedBill.appointment_date).toLocaleDateString()}</span>
              </div>

              <hr className="my-6 border-slate-100" />

              <div className="flex justify-between text-xl font-extrabold text-slate-900 bg-slate-50 p-4 rounded-xl">
                <span>Total Amount:</span>
                <span>₹{selectedBill.amount}</span>
              </div>
            </div>

            <button
              className="mt-8 w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition active:scale-[0.98]"
              onClick={() => window.print()}
            >
              Print Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
