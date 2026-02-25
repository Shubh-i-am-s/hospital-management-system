const db = require("../db");

exports.getDepartments = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM departments");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
