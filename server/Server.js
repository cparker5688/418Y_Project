const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./UserSchema');
const Restaurant = require('./RestaurantSchema');
const Favorite = require('./FavoritesSchema');

const app = express();
app.use(express.json());
app.use(cors());

// ——————————————————————————
// MongoDB Connection
// ——————————————————————————
const mongoString = 'mongodb+srv://cparker4:BellyUp2025@cluster0.hcu16fb.mongodb.net';
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('✅ Connected to MongoDB'));

// ——————————————————————————
// Routes
// ——————————————————————————

// POST /createUser
// Expects { firstName, lastName, username, password }
app.post('/createUser', async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ error: 'Username already exists' });

    const user = new User({ firstName, lastName, username, password, preferences: [] });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// GET /getUser?username=yourName
app.get('/getUser', async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /createRestaurant
// Expects { name, address, hours, options, image }
app.post('/createRestaurant', async (req, res) => {
  try {
    const { name, address, hours, options, image } = req.body;
    const restaurant = new Restaurant({ name, address, hours, options, image });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
});

// GET /getDeals
// Returns all restaurants (you can filter here if you only want those with active deals)
app.get('/getDeals', async (req, res) => {
  try {
    const deals = await Restaurant.find();
    res.json(deals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
});

app.post('/savePreferences', async (req, res) => {
  try {
    const { username, preferences } = req.body;

    if (!preferences || !username) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    const user = await User.findOneAndUpdate(
      { username },
      { preferences },
      { new: true }
    );

    if (!user) {
      console.log('User not found for username:', username);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("Updated user:", user);
    res.json(user);
  } catch (err) {
    console.error('Error saving preferences:', err);
    res.status(500).json({ error: 'Failed to save preferences'});
  }
});



app.post('/addFavorite', async (req, res) => {
  try {
    const { userId, restaurantId } = req.body;
    const favorite = new Favorite({ userId, restaurantId });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

app.get('/getFavorites', async (req, res) => {
  try {
    const { userId } = req.query;
    const favorites = await Favorite.find({ userId }).populate('restaurantId');
    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

app.delete('/removeFavorite/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.deleteOne({ _id: id });
    res.status(200).send('Favorite removed');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

// ——————————————————————————
// Start Server
// ——————————————————————————
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
