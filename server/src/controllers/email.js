const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const OTP = require('../models/Otp');
const { generateOtp } = require('../services/mailSender');


const checkMail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new BadRequestError("Please Provide email");
    }
    let isPasswordSet = true;
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({ email: email });
    }

    if (!user.email_verified || !user.password) {
        const otp = await generateOtp();
        console.log(otp);
        const otpPayload = { email: email, otp: otp, otp_type: "email" };
        console.log(otpPayload);
        await OTP.create(otpPayload);
        isPasswordSet=false;
    }

     res.status(StatusCodes.OK).json({
        email_verified: user.email_verified,
        phone_verified: user.phone_verified,
        isPasswordSet:isPasswordSet
    })
    

};

module.exports = {
    checkMail
};