const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/", productController.list)
router.get("/cart", authMiddleware, productController.cart)
router.get("/:id", productController.show)
module.exports = router;