const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.get("/products", adminController.index)
router.get("/products/create-product", adminController.create)
router.post("/products", adminController.store)
router.get("/products/:id", adminController.detail)
router.get("/products/:id/edit", adminController.edit)
router.put("/products/:id", adminController.update)
router.delete("/products/:id", adminController.destroy)
module.exports = router;