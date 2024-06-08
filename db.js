const mongoose = require('mongoose');
// const dbURL = process.env.DB_URL;
const dbURL = "mongodb://localhost:27017/hotel"
mongoose.connect(dbURL)

//connection is a property which itself is an object which contains server connection info
let db = mongoose.connection;

//server event listeners
db.on('connected', () =>{
    console.log("Connected to database");
})

db.on('disconnected', () =>{
    console.log("Disconnected from database");
})

db.on('error', (error) =>{
    console.log("MongoDB connection error" + error);
})

//export the db object
module.exports = db;