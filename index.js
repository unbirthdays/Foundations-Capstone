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
app.get("/api/getAllRestaurants", getAllRestaurants); // Gets every single restaurant, no filters
app.get("/api/getRestaurants", getRestaurants); // Returns all restaurants that match the filters
app.get("/api/getRestaurant", getRestaurant); // Getting ONE specific restaurant with tags given a name, implement in future?
app.get("/api/getRandomRestaurant", getRandomRestaurant); // Returns a random restaurant with name and tags
app.post("/api/addRestaurant", addRestaurant); // Adds a restaurant to the db with tags
app.delete("/api/deleteRestaurant", deleteRestaurant); // Deletes a restaurant from the db

// Tags API calls
app.get("/api/getAllTags", getAllTags);
app.get("/api/getRandomGenericTag", getRandomGenericTag);
app.post("/api/addTag", addTag);
app.delete("/api/deleteTag", deleteTag);

// Serve HTML pages
app.use("/", express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));