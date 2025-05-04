// const express = require("express");
// const router = express.Router();
// const AuthController = require("../controllers/authController");

// router.post("/login", AuthController.login);
// router.post("/signup", AuthController.signup);

// module.exports = router;
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

console.log("📥 Auth route file loaded");

router.post("/login", (req, res, next) => {
  console.log("🔐 Login route hit with body:", req.body);
  next();
}, AuthController.login);

router.post("/signup", (req, res, next) => {
  console.log("📝 Signup route hit with body:", req.body);
  next();
}, AuthController.signup);

module.exports = router;
