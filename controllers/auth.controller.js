const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const {signUpErrors} = require('../utils/errors.utils');

const maxAge =  3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const {pseudo, email, adresse, latitude, longitude, password} = req.body

    try{
        const user = await UserModel.create({pseudo, email, adresse, geoPos:{latitude, longitude}, password});
        res.status(201).json({ user: user._id});
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(400).send({ errors });
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge:maxAge })
        res.status(201).json({ user: user._id })
    } 
    catch (err) {
        const errors = signUpErrors(err);
        res.status(400).send({ errors });
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');

}