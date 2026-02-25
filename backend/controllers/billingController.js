const db = require("../db");

// GET bills with full details
exports.getBills = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        b.bill_number,
        b.amount,
        a.appointment_id,
        p.p_name,
        d.doctor_name,
        a.appointment_date
      FROM bill b
      JOIN appointments a ON b.appointment_id = a.appointment_id
      JOIN patients p ON a.patient_id = p.patient_id
      JOIN doctors d ON a.doctor_id = d.doctor_id
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD bill
exports.addBill = async (req, res) => {
  const { appointment_id, bill_number, amount } = req.body;

  try {
    await db.query(
      `INSERT INTO bill (appointment_id, bill_number, amount)
       VALUES (?, ?, ?)`,
      [appointment_id, bill_number, amount],
    );

    res.json({ message: "Bill created successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
