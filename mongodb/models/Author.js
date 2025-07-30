const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: String,
    bio: String
});

const Author = new mongoose.model('Author',AuthorSchema);

module.exports = Author;