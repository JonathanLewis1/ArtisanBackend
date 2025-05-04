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

const homeRoutes = require('./routes/bhome');
app.use('/api/home', homeRoutes);

const sellerRoutes = require('./routes/bseller');
app.use('/api/seller', sellerRoutes);

const headerRoutes = require('./routes/bheader');
app.use('/api/header', headerRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));