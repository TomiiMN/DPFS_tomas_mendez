const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// Vistas
router.get("/login", userController.login);
router.get("/register", userController.register);
router.get("/profile/:id", userController.profile);
// CRUD
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);
module.exports = router;