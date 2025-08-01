const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
}, { timeStamps: true });

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;