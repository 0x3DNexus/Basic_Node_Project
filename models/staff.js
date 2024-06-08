//define person schema for hotel database

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let staffSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    position:{
        type: String,
        enum: ["Chef", "Waiter", "Cleaner"],
        required: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

// staffSchema.pre('save', async function(next){
    
//     try{
//         if(!this.isModified('password')){
//             return next();
//         }
    
//         let hashedPassword = await bcrypt.hash(this.password, 10);
//         this.password = hashedPassword;
//     }
//     catch(error){
//         return next(error);
//     }
// })

let staff = new mongoose.model('staff', staffSchema);

module.exports = staff;