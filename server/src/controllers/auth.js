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

const refreshToken = async (req, res) => {
    const { type, refresh_token } = req.body;
    if (!type || !["socket", "app"].includes(type) || !refresh_token) {
        throw new BadRequestError("Invalid body");
    }
    try {
        let accessToken, newRefreshToken;
        if (type === "socket") {
            ({ accessToken, newRefreshToken } = await generateRefreshTokens(
                refresh_token,
                process.env.REFRESH_SOCKET_TOKEN_SECRET,
                process.env.REFRESH_SOCKET_TOKEN_EXPIRY,
                process.env.SOCKET_TOKEN_SECRET,
                process.env.SOCKET_TOKEN_EXPIRY
            ));
        } else if (type === "app") {
            ({ accessToken, newRefreshToken } = await generateRefreshTokens(
                refresh_token,
                process.env.REFRESH_TOKEN_SECRET,
                process.env.REFRESH_SOCKET_TOKEN_EXPIRY,
                process.env.JWT_SECRET,
                process.env.ACCESS_TOKEN_EXPIRY
            ));
        }

        res
            .status(StatusCodes.OK)
            .json({ access_token: accessToken, refresh_token: newRefreshToken });
    } catch (error) {
        console.error(error);
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "Invalid or expired token" });
    }
};

async function generateRefreshTokens(
    token,
    refresh_secret,
    refresh_expiry,
    access_secret,
    access_expiry
) {
    try {
        const payload = jwt.verify(token, refresh_secret);
        const user = await User.findById(payload.userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const accessToken = await jwt.sign({ userId: user.id }, access_secret, {
            expiresIn: access_expiry,
        });

        const newRefreshToken = await jwt.sign(
            { userId: user.id },
            refresh_secret,
            {
                expiresIn: refresh_expiry,
            }
        );

        return { accessToken, newRefreshToken };
    } catch (error) {
        console.error(error);
        throw new UnauthenticatedError("Invalid or expired token");
    }
}

const logout = async (req, res) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    await User.updateOne({ _id: userId }, { $unset: { biometricKey: 1 } });
    res.status(StatusCodes.OK).json({ message: "User logged out successfully" });
};

module.exports = {
    setpassword, login, oauth, logout, refreshToken
}