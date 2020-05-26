const express = require("express");
const createError = require('http-errors');
const router = express.Router();
const ProductController = require('../Controllers/products.controller');
const checkAuth = require('../Middleware/check-auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(createError(500, "only jpg and png allowed"), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter

});


router.post("/uploadImage", checkAuth,upload.single('file') ,ProductController.imageUpload);
router.post("/uploadProduct", checkAuth,ProductController.productUpload);

module.exports = router;