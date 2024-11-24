const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

// สร้าง Schema สำหรับ User
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 8).then(hash => {
        user.password = hash
        next()
    }).catch(error => {
        console.error(error)
    })
})
// สร้าง Model สำหรับการใช้งาน

const User = mongoose.model('User', userSchema,);

module.exports = User;