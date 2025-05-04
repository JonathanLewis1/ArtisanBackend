const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS config for deployed frontend only
const allowedOrigins = [
  "https://polite-sand-0dd94df1e.6.azurestaticapps.net"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));
  

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
