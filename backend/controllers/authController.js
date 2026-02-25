const db = require("../db");

exports.login = async (req, res) => {
  const { r_id, r_pass } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM receptionist WHERE r_id = ? AND r_pass = ?",
      [r_id, r_pass],
    );

    if (rows.length > 0) {
      res.json({ success: true, message: "Login successful ✅" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid credentials ❌" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
