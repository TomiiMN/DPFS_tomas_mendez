const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authAdminMiddleware = require("../middlewares/auth-admin-middleware");
const { productValidations } = require('../utils/product-validator');

// ── Vistas ─────────────────────────────────────────────────────────────────
router.get("/products", authAdminMiddleware, adminController.index);
router.get("/products/create-product", authAdminMiddleware, adminController.create);
router.get("/products/:id", authAdminMiddleware, adminController.detail);
router.get("/products/:id/edit", authAdminMiddleware, adminController.edit);

// ── CRUD ───────────────────────────────────────────────────────────────────
router.post("/products",
    authAdminMiddleware,
    productValidations,
    adminController.store
);

router.put("/products/:id",
    authAdminMiddleware,
    productValidations,
    adminController.update
);

router.delete("/products/:id", authAdminMiddleware, adminController.destroy);

module.exports = router;