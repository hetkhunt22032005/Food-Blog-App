const asyncHandler = require('express-async-handler');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const userSignUp = asyncHandler(async (req, res) => {
    // console.log('some one trying to sign in');
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({ message: "all fields must be filled." });
    }

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: "Email already exist" });
    }
    const newUser = await User.create({ email, password, username });
    const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
    return res.status(200).json({ token, user: newUser });
});

const userLogin = asyncHandler(async (req, res) => {
    // console.log('someone try to login');
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Emial and password is required" });
    }
    const user = await User.findOne({ email });
    // console.log('got the user');
    if (user && user.password === password) {
        const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
        return res.status(200).json({ token, user });
    } else {
        return res.status(400).json({ error: "Invalid credientials" });
    }
});

const getUser = asyncHandler(async (req, res) => {
    // console.log('someone wants user');
    const user = await User.findById(req.params.id)
    return res.json({ username: user.username });
});

module.exports = { userLogin, userSignUp, getUser };