const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRoutes = require('./routes/user.routes');
require ('dotenv').config({path: './config/.env'});
require("./config/db");
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
})

//routes
app.use('/api/user', usersRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`listening port ${process.env.PORT}`);
})