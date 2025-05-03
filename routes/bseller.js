const express = require("express");
const router = express.Router();
const SellerController = require("../controllers/sellerController");

router.get("/products", SellerController.getSellerProducts);
router.post("/products", SellerController.addProduct);
router.patch("/products/:id/stock", SellerController.updateStock);
router.delete("/products/:id", SellerController.deleteProduct);

module.exports = router;
