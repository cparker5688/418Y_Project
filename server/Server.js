const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./UserSchema');
const Restaurant = require('./RestaurantSchema');

app.use(express.json());
app.use(cors())
app.listen(9000, ()=> {
    console.log('Server Started at ${9000}')
})

const mongoose = require('mongoose');
const mongoString = "mongodb+srv://cparker4:BellyUp2025@cluster0.hcu16fb.mongodb.net/"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error))

database.once('connected', () => console.log('Database Connected'))

app.post('/createUser', async (req, res) => {
    console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username} ${req.body.firstName} ${req.body.lastName}`)
    const un = req.body.username
    try {
        //Check if username already exists in database
        User.exists({username: un}).then(result => {
            if(Object.is(result, null)) {
                const user = new User(req.body);
                user.save()
                console.log(`User created! ${user}`)
                res.send(user)
            }
            else {
                console.log("Username already exists")
                res.status(500).send("Username already exists")
            }
        })
    }
    catch (error){
        res.status(500).send(error)
    }
})
app.get('/getUser', async (req, res) => {
    console.log(`SERVER: GET USER REQ BODY: ${JSON.stringify(req.query)}`)
    const username = req.query.username
    const password = req.query.password
    try {
        const user = await User.findOne({ username, password })
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})
app.post('/createRestaurant', async (req, res) => {
    console.log('SERVER: Creating restaurant with the following data:', req.body);
    const{ name, address, hours, options, image} = req.body;
    try{
        const restaurant = new Restaurant({
            name,
            address,
            hours,
            options,
            image
    });
    await restaurant.save();
    console.log(`Restaurant created! ${restaurant}`)
    res.send(restaurant);
} catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).send(error);
}
})

app.get('/getRestaurants', async (req, res) => {
    console.log(`SERVER: GET RESTAURANT REQ BODY: ${JSON.stringify(req.query)}`);
    const { name, address, hours, options, image } = req.query;
    try {
        const restaurant = await Restaurant.find({ name, address, hours, options, image });
        res.send(restaurant);
    } catch (error) {
        res.status(500).send(error);
    }
});