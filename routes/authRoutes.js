const express = require('express')
const router = express.Router()


const {register, login, logout} = require('../controllers/authController');

router.post('/regiser',register)
router.post('/login',login)
router.get('/logour',logout)

module.exports = router;