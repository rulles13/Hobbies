const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true,
        },
        firstName: {
            type: String,
            minLength: 2,
            maxLength: 55,
        },
        lastName: {
            type: String,
            minLength: 2,
            maxLength: 55,
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            maxLenght: 1024,
            minLength: 6,
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

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;