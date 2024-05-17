const express = require('express');
const { register, login } = require('../controllers/auth');
const { checkMail } = require('../controllers/email');

const router = express.Router();

router.get('/',(req,res) => {
    res.send("Auth")
})
router.post("/register", register);
router.post("/login", login)
router.post('/check-email', checkMail);

module.exports = router;