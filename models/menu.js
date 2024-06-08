//menu schema

let mongoose = require('mongoose');

let menuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    is_drink:{
        type: Boolean,
        default: false
    },

    num_of_sales:{
        type: Number,
        required: true
    }
})

menuSchema = new mongoose.model('menu', menuSchema);
module.exports = menuSchema;