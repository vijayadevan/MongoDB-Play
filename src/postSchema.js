const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = {
    title : String,
    content: String
};

module.exports = postSchema;