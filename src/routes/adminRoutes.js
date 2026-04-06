const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.get("/products", adminController.admin);
router.get("/products/edit-product", adminController.edit);
router.get("/products/new-product", adminController.create);
module.exports = router;