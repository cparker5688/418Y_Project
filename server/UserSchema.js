const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    options: [String],
    numOptions: String,
    preferences: {
        showRestaurants: Boolean,
        showBars: Boolean,
        startTime: String,
        endTime: String,
        priceLevels: Object,
        minRating: Number,
        maxDistance: Number,
        days: Object
      }
        
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
