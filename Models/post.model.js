const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxlength: 2048
        },
        picture: {
            type: String
        },
        video: {
            type: String
        },
        comments: {
            type: [
                {commenterId: String,
                commenterPseudo: String,
                text: String,
                timestamps: Number
                }
            ],
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post',PostSchema);