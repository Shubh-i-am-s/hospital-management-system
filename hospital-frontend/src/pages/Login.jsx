import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    r_id: "",
    r_pass: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://hospital-management-system-1u7z.onrender.com/auth/login",
        formData,
      );

      if (res.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Receptionist Login
        </h2>

        <input
          type="number"
          placeholder="Receptionist ID"
          name="r_id"
          value={formData.r_id}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="r_pass"
          value={formData.r_pass}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
