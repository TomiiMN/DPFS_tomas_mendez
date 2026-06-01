const express = require("express");
const router = express.Router();
const upload = require('../middlewares/multer');
const authMiddleware = require("../middlewares/auth-middleware");
const userController = require("../controllers/user-controller");
const {
    registerValidations,
    loginValidations,
    updateInfoValidations,
    updatePasswordValidations,
} = require('../utils/user-validator');
 
// ── Vistas ─────────────────────────────────────────────────────────────────
router.get("/login",   userController.login);
router.get("/register", userController.register);
router.get("/profile", authMiddleware, userController.profile);
 
// ── CRUD ───────────────────────────────────────────────────────────────────
router.post("/login",
    loginValidations,
    userController.loginProcess
);
 
router.post("/register",
    upload.single("avatar"),
    registerValidations,
    userController.create
);
 
router.post("/update-info/:id",
    authMiddleware,
    updateInfoValidations,
    userController.updateInfo
);
 
router.post("/update-password/:id",
    authMiddleware,
    updatePasswordValidations,
    userController.updatePassword
);
 
router.post("/update-avatar/:id",
    upload.single("avatar"),
    authMiddleware,
    userController.updateAvatar
);
 
router.post("/logout", userController.logout);
router.post("/delete/:id", authMiddleware, userController.delete);
 
module.exports = router;