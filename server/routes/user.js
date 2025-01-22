const express = require('express');
const router = express.Router();
const { handleUserSignUp, handleUserLogin, handleUserUpdate } = require('../controllers/user');
const { verifyToken } = require('../middlewares/auth');

router.post('/signup', handleUserSignUp);
router.post('/login', handleUserLogin);
router.put('/', verifyToken, handleUserUpdate)




module.exports = router;