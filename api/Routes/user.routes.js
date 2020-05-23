const express = require("express");

const router = express.Router();

const UserController = require('../Controllers/users.controller');

const checkAuth = require('../Middleware/check-auth');
router.post("/register", UserController.registerUser);


router.post('/login', UserController.userLogin);


router.delete('/:userId',checkAuth, UserController.deleteUser);

module.exports = router;