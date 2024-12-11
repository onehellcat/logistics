// routes/devices.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // Assuming db.js handles your MySQL connection
const { log, error } = require("console");
const { put } = require("./devices");

// Get all devices
router.get("/:deviceType", (req, res) => {
  const { deviceType } = req.params;
  const query = `SELECT * FROM ${deviceType}`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new device
router.post("/:deviceType", (req, res) => {
  const { deviceType } = req.params;
  const data = req.body;
  const query = `INSERT INTO ${deviceType} SET ?`;
  db.query(query, data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({
      message: `${deviceType.slice(0, -1)} added`,
      id: result.insertId,
    });
  });
});

// routes/devices.js
router.put("/:deviceType/:serial_number", (req, res) => {
  const { deviceType, serial_number } = req.params;
  const updatedDevice = req.body;
  const table = deviceType === "laptops" ? "laptops" : "phones";
  const query = `UPDATE ${table} SET ? WHERE serial_number = ?`;

  db.query(query, [updatedDevice, serial_number], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `${deviceType} not found` });
    }

    res.status(200).json({
      message: `${
        deviceType.charAt(0).toUpperCase() + deviceType.slice(1)
      } updated successfully`,
    });
  });
});

// Export the router to use in server.js
module.exports = router;
