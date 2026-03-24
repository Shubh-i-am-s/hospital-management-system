const db = require("../db");

exports.getDepartments = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM departments");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDepartment = async (req, res) => {
  const { dept_name } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO departments (dept_name) VALUES (?)",
      [dept_name]
    );
    res.json({ department_id: result.insertId, dept_name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
