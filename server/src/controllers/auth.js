const User = require('../models/User')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const setpassword = async (req, res) => {
    try {
        const { email, password, pass_token } = req.body;
        if (!email || !password || !pass_token) {
            throw new BadRequestError("invalid Request")
        }
        const user = await User.create({ email });
        const payload = jwt.verify(pass_token, process.env.PASSWORD_SET_SECRET)
        if (payload.user !== user.id) {
            throw new NotFoundError("Onvalid Token");
        }
        if (!user || user.email_verified) {
            throw new BadRequestError("Password set! use reset password")
        }
        if (!user && user.password) {
            throw new BadRequestError("Password set! use reset password")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const updateduser = await User.findOneAndUpdate(user.id, {
            password: hashedpassword
        });

        console.log(updateduser);

        const access_token = user.createRefreshToken();
        const refresh_token = user.createRefreshToken();
        res.status(StatusCodes.CREATED).json({
            user: { name: updateduser.name, userId: updateduser.id },
            token: { access_token: access_token, refesh_token: refresh_token },
        })

    } catch (error) {
        console.log(error);
        throw new BadRequestError("check pass token or body");
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

const oauth = async (req, res) => {
    const { id_token } = req.body;
}

module.exports = {
    setpassword, login, oauth,
}