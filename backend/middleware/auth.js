const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const verifyToken = asyncHandler(async (req, res, next) => {
    let token = req.headers["authorization"];
    // console.log('some one trying to access protected route');
    // console.log(token);
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid token" });
            } else {
                // console.log(decoded)
                req.user = decoded;

                next();
            }

        })
    } else {
        return res.status(400).json({ message: "Invalid token" });
    }
});

module.exports = verifyToken