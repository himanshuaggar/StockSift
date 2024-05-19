const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {
    BadRequestError,
    NotFoundError,
} = require("../errors");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email",
            ],
            unique: true,
        },
        password: {
            type: String,
            // required:true,
            minlength: 6,
        },
        name: {
            type: String,
            // required: true,
            maxlength: 50,
            minlength: 3
        },
        login_pin: {
            type: String,
        },
        phone_number: {
            type: String,
            match: [
                /^[0-9]{10}$/,
                "Please provide a 10-digit phone number without spaces or special characters",
            ],
        },
        address: String,
        date_of_birth: Date,
        biometricKey: String,
        email_verified: {
            type: Boolean,
            default: false,
        },
        phone_verified: {
            type: Boolean,
            default: false,
        },
        bank_amount: {
            type: Number,
            default: 0,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },
        // wrong_pin_attempts: {
        //     type: Number,
        //     default: 0,
        // },
        // blocked_until_pin: {
        //     type: Date,
        //     default: null,
        // },
        // wrong_password_attempts: {
        //     type: Number,
        //     default: 0,
        // },
        // blocked_until_password: {
        //     type: Date,
        //     default: null,
        // },
    },
    {
        timestamps: true
    },
);


UserSchema.pre("save", async function () {
    if (this.isModified("login_pin")) {
        const salt = await bcrypt.genSalt(10);
        this.login_pin = await bcrypt.hash(this.login_pin, salt);
    }
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};
UserSchema.statics.updatePassword = async function (email, newPassword) {
    try {
        const user = await this.findOne({ email });
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            throw new BadRequestError(
                "New password must be different from the current password"
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await this.findOneAndUpdate(
            { email },
            {
                password: hashedPassword,
                blocked_until_password: null,
                wrong_password_attempts: 0,
            }
        );

        return { success: true, message: "Password updated successfully" };
    } catch (error) {
        throw error;
    }
};


UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}
UserSchema.methods.createAccessToken = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

UserSchema.methods.createRefreshToken = function () {
    return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;