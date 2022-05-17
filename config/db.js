const mongoose = require("mongoose");

mongoose
    .connect('mongodb+srv://' + process.env.USER + ':' + process.env.PSWD + '@cluster0.z6uu4.mongodb.net/hobbies')
    .then(() => console.log('Connected to mongoDB'))
    .catch((err) => console.log('failed to connect to MongoDB', err));