const express = require("express");
const router = express.Router();
const upload = require('../middlewares/multer');
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");
// Vistas
router.get("/login", userController.login);
router.get("/register", userController.register);
router.get("/profile", authMiddleware, userController.profile);
// CRUD
router.post("/login", userController.loginProcess);
router.post("/register", upload.single("avatar"), userController.create);
router.post("/update-info/:id", userController.updateInfo);
router.post("/update-password/:id", userController.updatePassword);
router.post("/update-avatar/:id", upload.single("avatar"), userController.updateAvatar);
router.post("/logout", userController.logout);
router.post("/delete/:id", userController.delete);
module.exports = router;