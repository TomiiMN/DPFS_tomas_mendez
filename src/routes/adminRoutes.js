const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");
router.get("/products", authAdminMiddleware, adminController.index)
router.get("/products/create-product", authAdminMiddleware, adminController.create)
router.post("/products", authAdminMiddleware, adminController.store)
router.get("/products/:id", authAdminMiddleware, adminController.detail)
router.get("/products/:id/edit", authAdminMiddleware, adminController.edit)
router.put("/products/:id", authAdminMiddleware, adminController.update)
router.delete("/products/:id", authAdminMiddleware, adminController.destroy)
module.exports = router;