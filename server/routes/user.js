const express = require('express');
const router = express.Router();
const { handleUserSignUp, handleUserLogin, handleUserUpdate } = require('../controllers/user');

router.post('/signup', handleUserSignUp);
router.post('/login', handleUserLogin);
router.put('/', handleUserUpdate)




module.exports = router;