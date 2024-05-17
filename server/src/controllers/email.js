const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { generateOtp } = require('../services/mailSender');
const Otp = require('../models/Otp');


const checkMail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new BadRequestError("Please Provide email");
    }

    let user = User.findOne({ email });
    if (!user) {
        user = await User.create({ email: email });
    }

    if (!user.email_verified || !user.password) {
        const otp = await generateOtp();
        const otpPayload = { email: email, otp: otp, otp_type: "email" };
        await Otp.create(otpPayload);
    }

    res.status(StatusCodes.OK).json({
        email_verified: user.email_verified,
        phone_verified: user.phone_verified,
    })

};

module.exports = {
    checkMail
};