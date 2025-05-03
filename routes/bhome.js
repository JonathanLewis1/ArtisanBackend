const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");

router.get("/products", HomeController.getAllProducts);
router.get("/products/:id", HomeController.getProductById);

module.exports = router;
