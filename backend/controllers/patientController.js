const db = require("../db");

// GET all patients
exports.getAllPatients = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM patients");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD patient
exports.addPatient = async (req, res) => {
  const { p_name, gender, age, phone, address } = req.body;

  try {
    await db.query(
      "INSERT INTO patients (p_name, gender, age, phone, address) VALUES (?, ?, ?, ?, ?)",
      [p_name, gender, age, phone, address],
    );

    res.json({ message: "Patient added successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
