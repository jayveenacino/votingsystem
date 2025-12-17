const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
    studentNumber: {
        type: String,
        required: true,
        unique: true, 
        match: /^\d{6}$/
    },
    course: String,
    yearLevel: String
});

module.exports = mongoose.model('User', UserSchema, 'users');
