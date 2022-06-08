const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
//const cookieParser = require ('cookie-parser');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log('bad token');
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge:1});
                return res.status(400).send('bad token');
            } else {
                console.log('token is ok');
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        console.log('no token from auth middleware');
        res.locals.user = null;
        return res.status(400).send('no token from auth middleware');
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        })
    } else {
        console.log('no token');
    }
}