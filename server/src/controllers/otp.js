const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const OTP = require('../models/Otp');
const bcrypt = require("bcryptjs");
const { generateOtp } = require('../services/mailSender');
const jwt = require("jsonwebtoken");


const verifyOtp = async (req, res) => {
    const { data, email, otp, otp_type } = req.body;

    if (!email || !otp || !otp_type) {
        throw new BadRequestError("Invalid Body of reques");
    } else if (otp_type != "email" && !data) {
        throw new BadRequestError("Invalid Body for Request")
    }

    const otpRecord = await OTP.findOne({ email, otp_type })
        .sort({ createdAt: -1 }) // sorting it with latest one logic
        .limit(1);

    if (!otpRecord) {
        throw new BadRequestError("Invalid OTP or OTP Expired")
    }
    const isVerified = await otpRecord.compareOTP(otp)
    if (!isVerified) {
        throw new BadRequestError("Invalid OTP or OTP expired")
    }
    await otpRecord.deleteOne(otpRecord.id)

    switch (otp_type) {
        case "phone":
            await User.findOneAndUpdate({ email }, { phone_number: data, phone_verified: true });
            break;
        case "email":
            await User.findOneAndUpdate({ email }, { email_verified: true });
            break;
        case "reset_pin":
            await User.findOneAndUpdate({ email }, { login_pin: data });
            break;
        // if (!data || data.length != 4) {
        //     throw new BadRequestError("PIN Should be 4 Digit");
        // }
        // await User.updatePIN(email, data);
        // break;
        case "reset_password":
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data, salt);
            await User.findOneAndUpdate({ email }, { password: hashedPassword })
            break;
        // await User.updatePassword(email, data);
        // break;
        default:
            throw new BadRequestError("Invalid OTP Request type");
    }

    const user = await User.findOne({email});
    const pass_token = jwt.sign({ userId: user.id}, process.env.PASSWORD_SET_SECRET, {
        expiresUn: process.env.PASSWORD_SET_SECRET_EXPIRY
    });
    if(otp_type == 'email'){
        res.status(StatusCodes.OK).json({
            msg: "OTP Verified",
            pass_token: pass_token,
        })
        return
    }

    res.status(StatusCodes.OK).json({
        msg: "OTP Veriifed and operation completed successfully"
    })
}


const sendOtp = async (req, res) => {
    const { email, otp_type } = req.body;
    if (!email || !otp_type) {
        throw new BadRequestError("Invalid body for request");
    }

    const user = await User.findOne({ email });

    if (!user && otp_type == "phone") {
        throw new BadRequestError("User not found");
    }

    if (otp_type == "email" && user) {
        throw new BadRequestError("User already exist");
    }
    // if (otp_type == "phone" && user.phone_number) {
    //     throw new BadRequestError("Phone number already exist!");
    // }

    const otp = await generateOtp();
    const otpPayload = { email: email, otp: otp, otp_type: otp_type };
    await OTP.create(otpPayload);

    res.status(StatusCodes.OK).json({
        msg: "OTP Sent to registered email address",
    });
};

module.exports = { verifyOtp, sendOtp };