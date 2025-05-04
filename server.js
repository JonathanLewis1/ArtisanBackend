// // try {
// //     const express = require("express");
// //     require("dotenv").config();
// //     const cors = require("cors");
  
// //     // Firebase Admin Init
// //     try {
// //       require("./firebase/admin");
// //       console.log("✅ Firebase Admin initialized");
// //     } catch (firebaseError) {
// //       console.error("❌ Firebase Admin init failed:", firebaseError);
// //     }
  
// //     const app = express();
  
// //     // CORS config
// //     app.use(cors({
// //       origin: "https://polite-sand-0dd94df1e.6.azurestaticapps.net",
// //       credentials: true,
// //       methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
// //       allowedHeaders: ["Content-Type", "Authorization"]
// //     }));
  
// //     app.use(express.json());
  
// //     // Basic sanity check
// //     app.get("/", (req, res) => {
// //       console.log("✅ Root route hit");
// //       res.send("API is running");
// //     });
  
// //     // Health check
// //     app.get("/health", (req, res) => {
// //       console.log("✅ Health check route hit");
// //       res.status(200).send("OK");
// //     });
  
// //     // Load routes
// //     try {
// //       const authRoutes = require("./routes/auth");
// //       app.use("/api/auth", authRoutes);
  
// //       const homeRoutes = require("./routes/bhome");
// //       app.use("/api/home", homeRoutes);
  
// //       const sellerRoutes = require("./routes/bseller");
// //       app.use("/api/seller", sellerRoutes);
  
// //       const headerRoutes = require("./routes/bheader");
// //       app.use("/api/header", headerRoutes);
// //     } catch (routeError) {
// //       console.error("❌ Error loading routes:", routeError);
// //     }
  
// //     // Start server
// //     const PORT = process.env.PORT || 8080;
// //     app.listen(PORT, () => {
// //       console.log(`🚀 Server running on port ${PORT}`);
// //     });
// //   } catch (startupError) {
// //     console.error("❌ Fatal error during server startup:", startupError);
// //   }
// try {
//     const express = require("express");
//     require("dotenv").config();
//     const cors = require("cors");
  
//     console.log("🟡 Starting server setup...");
  
//     // Firebase Admin Init
//     try {
//       require("./firebase/admin");
//       console.log("✅ Firebase Admin initialized");
//     } catch (firebaseError) {
//       console.error("❌ Firebase Admin init failed:", firebaseError);
//     }
  
//     const app = express();
  
//     // CORS config
//     app.use(cors({
//       origin: "https://polite-sand-0dd94df1e.6.azurestaticapps.net",
//       credentials: true,
//       methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
//       allowedHeaders: ["Content-Type", "Authorization"]
//     }));
  
//     app.use(express.json());
  
//     // Basic sanity check
//     app.get("/", (req, res) => {
//       console.log("✅ Root route hit");
//       res.send("API is running");
//     });
  
//     // Health check
//     app.get("/health", (req, res) => {
//       console.log("✅ Health check route hit");
//       res.status(200).send("OK");
//     });
  
//     // Load routes with logging
//     console.log("🚀 Loading routes...");
//     try {
//       const authRoutes = require("./routes/auth");
//       console.log("✅ Loaded authRoutes");
//       app.use("/api/auth", authRoutes);
//     } catch (err) {
//       console.error("❌ Failed to load auth routes:", err);
//     }
  
//     // 404 handler
//     app.use((req, res) => {
//       console.error("❌ Route not found:", req.method, req.originalUrl);
//       res.status(404).send("Route not found");
//     });
  
//     // Start server
//     const PORT = process.env.PORT || 8080;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
  
//   } catch (startupError) {
//     console.error("❌ Fatal error during server startup:", startupError);
//   }
const express = require("express");
require("dotenv").config();
const cors = require("cors");

console.log("🔁 Starting server...");

// Firebase Admin Init
try {
  require("./firebase/admin");
  console.log("✅ Firebase Admin initialized");
} catch (firebaseError) {
  console.error("❌ Firebase Admin init failed:", firebaseError);
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

// Sanity check
app.get("/", (req, res) => {
  console.log("✅ Root route hit");
  res.send("API is running");
});

app.get("/health", (req, res) => {
  console.log("✅ Health check route hit");
  res.status(200).send("OK");
});

// Load routes
try {
  const authRoutes = require("./routes/auth");
  app.use("/api/auth", authRoutes);
  console.log("✅ /api/auth routes loaded");

  const homeRoutes = require("./routes/bhome");
  app.use("/api/home", homeRoutes);

  const sellerRoutes = require("./routes/bseller");
  app.use("/api/seller", sellerRoutes);

  const headerRoutes = require("./routes/bheader");
  app.use("/api/header", headerRoutes);
} catch (routeError) {
  console.error("❌ Error loading routes:", routeError);
}

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
