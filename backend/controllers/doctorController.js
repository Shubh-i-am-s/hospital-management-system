const db = require("../db");

// GET all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.*, dept.dept_name 
       FROM doctors d
       LEFT JOIN departments dept 
       ON d.department_id = dept.department_id`,
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD doctor
exports.addDoctor = async (req, res) => {
  const { doctor_name, specialization, phone, department_id } = req.body;

  try {
    await db.query(
      `INSERT INTO doctors (doctor_name, specialization, phone, department_id)
       VALUES (?, ?, ?, ?)`,
      [doctor_name, specialization, phone, department_id],
    );

    res.json({ message: "Doctor added successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
