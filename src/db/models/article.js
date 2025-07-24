import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    article: {
        type: String,
        required: false,
    },
    rate: {
        type: Number,
    },
    img: {
        type: String,
        default: null,
    },

}, {
    timestamps: true, versionKey: false
});


export const Article = mongoose.model('article', articleSchema);
