 require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/patients", require("./routes/patientRoutes"));
app.use("/doctors", require("./routes/doctorRoutes"));
app.use("/departments", require("./routes/departmentRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));
app.use("/billing", require("./routes/billingRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/receptionists", require("./routes/receptionistRoutes"));
app.use("/stats", require("./routes/statsRoutes"));

app.get("/test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.json({ message: "Database Connected ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
