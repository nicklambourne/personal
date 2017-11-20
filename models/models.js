let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Blog Posts
let postSchema = new Schema({
    id: String,
    published: Date,
    title: String,
    content: String,
    draft: Boolean,
});

let Post = mongoose.model('Post', postSchema);
exports.Post = Post;

// Reading List Books
let bookSchema = new Schema({
    id: String,
    author: String,
    title: String,
    completed: Date,
    number: Number
});

let Book = mongoose.model('Book', bookSchema);
exports.Book = Book;

