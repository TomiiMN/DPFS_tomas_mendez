const express = require("express");
const router = express.Router();
const upload = require('../middlewares/multer');
const { authMiddleware, authOwnerMiddleware } = require("../middlewares/auth-middleware");
const userController = require("../controllers/user-controller");
const {
    registerValidations,
    loginValidations,
    updateInfoValidations,
    updatePasswordValidations,
    updateAvatarValidations
} = require('../utils/user-validator');
router.get("/login",   userController.login);
router.get("/register", userController.register);
router.get("/profile", authMiddleware, userController.profile);
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
    authOwnerMiddleware,
    updateInfoValidations,
    userController.updateInfo
);

router.post("/update-password/:id",
    authOwnerMiddleware,
    updatePasswordValidations,
    userController.updatePassword
);

router.post("/update-avatar/:id",
    authOwnerMiddleware,
    upload.single("avatar"),
    updateAvatarValidations,
    userController.updateAvatar
);

router.post("/logout", userController.logout);
router.post("/delete/:id", authOwnerMiddleware, userController.delete);
 
module.exports = router;