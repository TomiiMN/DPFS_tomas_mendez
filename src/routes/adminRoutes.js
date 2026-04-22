const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.get("/products", adminController.index)
router.get("/create-product", adminController.create)
router.get("/:id", adminController.detail)
router.get("/:id/edit", adminController.edit)
router.post("/", adminController.store)
router.put("/:id", adminController.update)
module.exports = router;