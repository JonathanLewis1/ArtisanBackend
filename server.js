const express = require("express");
require("dotenv").config();
const cors = require("cors");

// Firebase Admin Init
try {
  require("./firebase/admin");
  console.log("✅ Firebase Admin initialized");
} catch (firebaseError) {
  console.error("❌ Firebase Admin init failed:", firebaseError);
  process.exit(1); // Stop if Firebase fails to init
}

const app = express();

// CORS config
app.use(cors({
  origin: "https://polite-sand-0dd94df1e.6.azurestaticapps.net",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is running"));
app.get("/health", (req, res) => res.status(200).send("OK"));

// Route loading
try {
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/home", require("./routes/bhome"));
  app.use("/api/seller", require("./routes/bseller"));
  app.use("/api/header", require("./routes/bheader"));
  console.log("✅ Routes loaded");
} catch (err) {
  console.error("❌ Error loading routes:", err);
}

app.get("/test-direct", (req, res) => {
  console.log("🚀 /test-direct route hit!");
  res.send("✅ Test route from server.js is working!");
});

app.get("/api/auth/test", (req, res) => {
  res.json({ message: "✅ Route working directly from server.js" });
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
