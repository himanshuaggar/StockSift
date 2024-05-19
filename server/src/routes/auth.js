const express = require('express');
const { register, login, setpassword } = require('../controllers/auth');
const { checkMail } = require('../controllers/email');
const { verifyOtp, sendOtp } = require('../controllers/otp');
const auth = require('../middleware/authentication');
const { updateProfile, setLoginPinFirst } = require('../controllers/user');

const router = express.Router();

router.get('/',(req,res) => {
    res.send("Auth")
})
// router.post("/register", register);
router.post("/login", login)
router.post('/check-email', checkMail);
router.post("/verify-otp", verifyOtp);
router.post("/send-otp", sendOtp);
router.post("set-password", setpassword);
router.put('/profile',auth, updateProfile);
router.put('/profile',auth, setLoginPinFirst);

module.exports = router;