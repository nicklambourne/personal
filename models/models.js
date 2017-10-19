let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
        id: String,
        published: Date,
        content: String,
    }
);

let Post = mongoose.model('Post', postSchema);

exports.Post = Post;