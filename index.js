require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const { seed, getAllRestaurants, getRestaurants, getRestaurant, getRandomRestaurant, addRestaurant, deleteRestaurant, getAllTags, getRandomGenericTag, addTag, deleteTag } = require('./controller.js')

app.use(express.json())
app.use(cors())

// Seed database
app.post("/seed", seed);

// Restaurant API calls
app.get("/api/getAllRestaurants", getAllRestaurants);
app.get("/api/getRestaurants", getRestaurants);
app.get("/api/getRestaurant", getRestaurant);
app.get("/api/getRandomRestaurant", getRandomRestaurant);
app.post("/api/addRestaurant", addRestaurant);
app.delete("/api/deleteRestaurant", deleteRestaurant);

// Tags API calls
app.get("/api/getAllTags", getAllTags);
app.get("/api/getRandomGenericTag", getRandomGenericTag);
app.post("/api/addTag", addTag);
app.delete("/api/deleteTag", deleteTag);

// Serve HTML pages
app.use("/", express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));