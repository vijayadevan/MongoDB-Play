var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = require('./postSchema');

var userSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    postCount: Number,
    posts: [postSchema]
});

var User = mongoose.model('user', userSchema);

module.exports = User;