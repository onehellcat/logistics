const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

// Initialize the Express app
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Import the devices router and use it
const devicesRouter = require("./routes/devices");
const { error } = require("console");
const db = require("./db");
app.use("/api", devicesRouter);

// Define the port (either from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
