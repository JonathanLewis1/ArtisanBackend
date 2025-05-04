// const express = require("express");
// const router = express.Router();
// const AuthController = require("../controllers/authController");

// router.post("/login", AuthController.login);
// router.post("/signup", AuthController.signup);

// module.exports = router;
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);

router.get("/test", (req, res) => {
    console.log("🧪 /api/auth/test hit");
    res.json({ message: "Test route working" });
  });

console.log("✅ Exporting auth routes");  
module.exports = router;