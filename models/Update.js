const mongoose = require('mongoose')
const Schema = mongoose.Schema
const updateSchema = new Schema({
    _id: String,
    title: String,
    content: String,
    
});
// สร้าง Model สำหรับ Posts
const update = mongoose.model('update', updateSchema,);

module.exports = update;