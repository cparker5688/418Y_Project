const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    restName: String,
    restAddress: String,
    restHours: String,
    restOptions: String
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
