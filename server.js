const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Optional root route for quick sanity check
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
