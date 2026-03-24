const db = require("../db");

exports.getStats = async (req, res) => {
  try {
    const [[{ "COUNT(*)": patients }]] = await db.query(
      "SELECT COUNT(*) FROM patients",
    );
    const [[{ "COUNT(*)": doctors }]] = await db.query(
      "SELECT COUNT(*) FROM doctors",
    );
    const [[{ "COUNT(*)": appointments }]] = await db.query(
      "SELECT COUNT(*) FROM appointments",
    );

    res.json({
      patients,
      doctors,
      appointments,
      revenue: "₹1,25,000", // Hardcoded for now as requested
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
