try {
    const express = require("express");
    require("dotenv").config();
    const cors = require("cors");
  
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
  
    // Basic sanity check
    app.get("/", (req, res) => {
      console.log("✅ Root route hit");
      res.send("API is running");
    });
  
    // Health check
    app.get("/health", (req, res) => {
      console.log("✅ Health check route hit");
      res.status(200).send("OK");
    });
  
    // Load routes
    try {
      const authRoutes = require("./routes/auth");
      app.use("/api/auth", authRoutes);
  
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
  } catch (startupError) {
    console.error("❌ Fatal error during server startup:", startupError);
  }
  