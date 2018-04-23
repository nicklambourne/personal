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

// Projects
let projectSchema = new Schema({
    id: String,
    title: String,
    github_link: String,
    description: String,
    post_link: String,
    img: String,
    published: Date
});

let Project = mongoose.model('Project', projectSchema);
exports.Project = Project;