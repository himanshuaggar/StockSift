const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:true,
            maxlength:50,
            minlength:3
        },
    }
);

const User = mongoose.model("User", UserSchema);

module.exports= User;