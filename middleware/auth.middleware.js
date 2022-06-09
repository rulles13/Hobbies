const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
//const cookieParser = require ('cookie-parser');

module.exports.checkUser = async (req, res, next) => {
    const token = await req.cookies.jwt;
    console.log("before");

    console.log(token);
    console.log("after");
    if (token) {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            async (err, decodedToken) => {
                if (err) {
                    console.log("bad token");
                    res.locals.user = null;
                    res.cookie("jwt", "", { maxAge: 1 });
                    next();
                } else {
                    console.log("token is ok");
                    let user = await UserModel.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                }
            }
        );
    } else {
        console.log("no token from auth middleware");
        res.locals.user = null;
        next();
    }
};

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(`the token is ${token}`);
    if (token) {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            async (err, decodedToken) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(decodedToken.id);
                    next();
                }
            }
        );
    } else {
        console.log("no token");
    }
};
