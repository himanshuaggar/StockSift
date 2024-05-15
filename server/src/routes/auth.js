const express = require('express');
const { register } = require('../controllers/auth');

const router = express.Router();

router.get('/',(req,res) => {
    res.send("Auth")
})
router.post("/register", register);

module.exports = router;