const express = require('express');
const { register, login, setpassword, refreshToken, logout } = require('../controllers/auth');
const { checkMail } = require('../controllers/email');
const { verifyOtp, sendOtp } = require('../controllers/otp');
const auth = require('../middleware/authentication');
const { updateProfile, setLoginPinFirst, verifyPin } = require('../controllers/user');
const { uploadBiometric, verifyBiometric } = require('../controllers/biometrics');

const router = express.Router();

router.get('/',(req,res) => {
    res.send("Auth")
})
router.post("/register", register);
router.post("/login", login)
router.post('/check-email', checkMail);
router.post("/verify-otp", verifyOtp);
router.post("/send-otp", sendOtp);
router.post("/set-password", setpassword);
router.put('/profile',auth, updateProfile);
router.put('/set-pin',auth, setLoginPinFirst);
router.post("/verify-pin", auth, verifyPin);
router.post("/upload-biometric", auth, uploadBiometric);
router.post("/verify-biometric", auth, verifyBiometric);
router.post("/refresh-token", refreshToken);
router.post("/logout", auth, logout);

module.exports = router;