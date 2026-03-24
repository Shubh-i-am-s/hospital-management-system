const db = require('../db');

async function clearData() {
  try {
    console.log("Starting database cleanup...");
    
    // Disable foreign key checks to allow truncation
    await db.query("SET FOREIGN_KEY_CHECKS = 0");

    const tables = ['bill', 'appointments', 'patients', 'doctors', 'receptionist'];
    
    for (const table of tables) {
      console.log(`Truncating table: ${table}...`);
      await db.query(`TRUNCATE TABLE ${table}`);
    }

    // Re-insert default receptionist
    console.log("Re-inserting default receptionist (101 / admin123)...");
    await db.query(
      "INSERT INTO receptionist (r_id, r_pass) VALUES (?, ?)",
      [101, 'admin123']
    );

    // Re-enable foreign key checks
    await db.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("Cleanup complete! ✅");
    process.exit(0);
  } catch (err) {
    console.error("Error during cleanup:", err.message);
    process.exit(1);
  }
}

clearData();
