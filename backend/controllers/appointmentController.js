const db = require("../db");

// GET all appointments with patient + doctor name
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
