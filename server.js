let express = require('express');
let app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log("Listening on PORT " + PORT);
});

//accept the post http request and parse the body
let body_parser = require("body-parser");
app.use(body_parser.json());

//request logger
const logger = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}], requested ${req.url}`);
    next();
} 

app.use(logger);

//use the auth middleware
// let auth = require('./auth.js');
// app.use(auth.initialize());
// let __auth = auth.authenticate('local', {session: false})

//handle basic get request upon visit
app.get('/',(req, res) =>{
    res.send("Hello !!!");
})

let db = require('./db.js');

let menu = require('./routes/menuItemRoutes.js');
app.use('/hotelMenu', menu); //params -> common endpoint, route

let staff = require('./routes/staffRoutes.js');
app.use('/hotelStaff', staff);