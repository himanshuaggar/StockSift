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
    let isExist = true;
    let user = await User.findOne({ email });
    
    if (!user) {
        const otp = await generateOtp();
        const otpPayload = { email: email, otp: otp, otp_type: "email" };
        await OTP.create(otpPayload);
        isExist=false;
    }

     res.status(StatusCodes.OK).json({
        isExist:isExist,
    })
    

};

module.exports = {
    checkMail
};