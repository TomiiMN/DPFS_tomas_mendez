const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.get("/products", adminController.admin);
router.get("/products/edit-product", adminController.edit);
module.exports = router;