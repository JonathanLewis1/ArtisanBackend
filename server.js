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
console.log("🟢 MAIN FILE EXECUTED!");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Firebase Admin Init
try {
  const { admin } = require("./firebase/admin");
  console.log("✅ Firebase Admin initialized");
} catch (firebaseError) {
  console.error("❌ Firebase Admin init failed:", firebaseError);
}

// CORS Configuration
app.use(cors({
  origin: "https://polite-sand-0dd94df1e.6.azurestaticapps.net",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  console.log("✅ Health check route hit");
  res.status(200).send("OK");
});

// Root sanity check
app.get("/", (req, res) => {
  console.log("✅ Root route hit");
  res.send("API is running");
});

// Direct debug route (bypasses router system)
app.get("/debug-direct", (req, res) => {
  console.log("🔍 Debug route hit directly");
  res.json({ message: "✅ Direct debug route works" });
});

// ROUTE IMPORTS
try {
  const authRoutes = require("./routes/auth");
  console.log("✅ Auth routes loaded:", typeof authRoutes);
  app.use("/api/auth", authRoutes);

  const sellerRoutes = require("./routes/bseller");
  app.use("/api/seller", sellerRoutes);

  const homeRoutes = require("./routes/bhome");
  app.use("/api/home", homeRoutes);

  const headerRoutes = require("./routes/bheader");
  app.use("/api/header", headerRoutes);

  console.log("✅ All routes mounted");
} catch (err) {
  console.error("❌ Failed to load routes:", err.stack);
}

// 404 Fallback
app.use((req, res) => {
  console.warn("❗ Unmatched route:", req.method, req.originalUrl);
  res.status(404).json({ message: "Not Found" });
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
