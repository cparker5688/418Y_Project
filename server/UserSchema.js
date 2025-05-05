const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    preferences: {
        cuisines:   { type: [String], default: [] },
        priceRange: {
            min: { type: Number, default: 1 },
            max: { type: Number, default: 5 }
        },
        distance:   { type: Number, default: 5 }
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
