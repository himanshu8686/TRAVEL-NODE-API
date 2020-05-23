const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type:String,
        maxlength:50,
        required: true
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|in|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
    },
    token : {
        type: String
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;