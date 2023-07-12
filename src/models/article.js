const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
        // ref: mongoose.model('User', '_id')
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;