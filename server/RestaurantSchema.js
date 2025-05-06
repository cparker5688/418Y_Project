const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    hours: String,
    options: [String],
    image: String
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
