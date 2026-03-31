const db = require("../db");

// GET all active appointments
exports.getAppointments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.appointment_id,
        a.appointment_date,
        a.appointment_time,
        p.p_name,
        d.doctor_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.patient_id
      JOIN doctors d ON a.doctor_id = d.doctor_id
      WHERE a.is_completed = FALSE
      ORDER BY a.appointment_id DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD appointment
exports.addAppointment = async (req, res) => {
  const { patient_id, doctor_id, appointment_date, appointment_time } =
    req.body;

  try {
    await db.query(
      `INSERT INTO appointments 
       (patient_id, doctor_id, appointment_date, appointment_time)
       VALUES (?, ?, ?, ?)`,
      [patient_id, doctor_id, appointment_date, appointment_time],
    );

    res.json({ message: "Appointment booked successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// MARK appointment as completed
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Soft delete: keep the record but hide it from the UI by marking as completed
    await db.query(`UPDATE appointments SET is_completed = TRUE WHERE appointment_id = ?`, [id]);
    
    res.json({ message: "Appointment marked automatically as completed ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
