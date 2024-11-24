const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema({
    title: String,
    content: String,
    admin: String,
});
// สร้าง Model สำหรับ Posts
const adPost = mongoose.model('Post', postSchema,'infoEmployee');

module.exports = adPost;