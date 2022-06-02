const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true,
        },
        firstName: {
            type: String,
            minlength: 2,
            maxlength: 55,
        },
        lastName: {
            type: String,
            minlength: 2,
            maxlength: 55,
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        adresse: {
            adresse :{
                type: String,
                //required: true,
                minlength: 10,
                maxlength: 55,   
            },
            latitude :{
                type: Number,
            },
            longitude :{
                type: Number,
            }  
        },
        password: {
            type: String,
            required: true,
            maxlenght: 1024,
            minlength: 6,
        },
        friends: {
            type: [String]
        },
        hobbies: {
            type: [String]
        },
        isAdmin: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true,
    }
);

//crypting password
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;