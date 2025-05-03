const express = require("express");
const router = express.Router();
const { auth } = require("../firebase/admin");

router.post("/verify-token", async (req, res) => {
  const { idToken } = req.body;
  try {
    const decoded = await auth.verifyIdToken(idToken);
    res.json({ uid: decoded.uid, email: decoded.email });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
