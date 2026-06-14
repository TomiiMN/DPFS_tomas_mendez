const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/avatars');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.fileValidationError = 'El archivo debe ser una imagen JPG, JPEG, PNG o GIF';
      cb(null, false);
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB máximo
});
module.exports = upload;