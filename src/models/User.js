const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username already exists'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        user.password = hash;
        next();
    });
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
