const Mongoose = require('mongoose');
const UserSchema = new Mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        minlength: 8,
        required: true,
        type: String,
    },

    email: {
        required: true,
        type: String,
        unique: true,
    },
});
const User = Mongoose.model("user", UserSchema)

module.exports = User;