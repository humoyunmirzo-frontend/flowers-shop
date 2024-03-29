// Routes/auth.route.js

const { Router } = require('express');
const { getLoginPage, getRegisterPage, loginUser, registerUser, logout } = require('../controllers/auth.controller');
const { body, check } = require('express-validator');
const router = Router();
const {protected, guest} = require('../middlewares/auth')
router.get('/register',guest,  getRegisterPage);
router.get('/login',guest,  getLoginPage);
router.post('/login-user', loginUser);
router.post('/logout', logout);
router.post('/register-user', registerUser);

module.exports = router;
