let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// Reading List Books

let authorSchema = new Schema({
    id: String,
    name: String,
    gender: String,
    nationality: String,
});

let Author = mongoose.model('Author', authorSchema);
exports.Author = Author;

let bookSchema = new Schema({
    id: String,
    author: [{type: Schema.Types.ObjectId, ref: 'Author'}],
    language: String,
    title: String,
    pages: Number,
    url: String,
    started: Date,
    completed: Date,
    medium: String,
    img: String,
});

let Book = mongoose.model('Book', bookSchema);
exports.Book = Book;

