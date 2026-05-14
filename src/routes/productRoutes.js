const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/", productController.list)
router.get("/cart", authMiddleware, productController.cart)
router.get("/:id", authMiddleware, productController.show)
router.post("/cart/add/:id", authMiddleware, productController.addToCart)
router.post("/cart/add/:id", authMiddleware, productController.add)
router.post("/cart/remove/:id", authMiddleware, productController.remove)
router.post("/cart/delete/:id", authMiddleware, productController.delete)
router.post("/cart/clear", authMiddleware, productController.clear)
module.exports = router;