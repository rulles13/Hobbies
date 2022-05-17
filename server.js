const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/user.routes');
require ('dotenv').config({path: './config/.env'});
require("./config/db")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/api/user', usersRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`listening port ${process.env.PORT}`);
})