const db = require("../db");

exports.getReceptionists = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT r_id, r_pass FROM receptionist");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
