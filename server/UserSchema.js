const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    options: [String]   
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
