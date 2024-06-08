let express = require('express');
let router = express.Router();
let {encryptPass, comparePass} = require('./../encrypt.js');
let {genToken, jwtauthMiddlewareFunction} = require('./../jwt_auth.js');


//import the models
let staff = require('./../models/staff.js');
const encrypt = require('./../encrypt.js');


//handle login post request and send an authentication token
router.post('/login', async (req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await staff.findOne({email: email});
        if(!user) return res.status(401).send("User Not found");

        const user_password = await comparePass(password, user.password);
        if(!user_password) return res.status(401).send("Invalid Password");

        let payload = {
            email: user.email,
            randomNumber: Math.random()
        }

        const token = genToken(payload)
        res.status(200).send({"token": token});
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }     
})

//handle post request at this endpoint
router.post('/register', async (req, res) =>{
    try{
        const recievedData = req.body;
        
        //create person object(document) which have the person model
        const newStaff = new staff(recievedData);
        
        newStaff.password = await encryptPass(newStaff.password);

        //save the data in the database
        await newStaff.save();
        
        const payload = {
            mail: newStaff.email,
            randomNumber: Math.random()
        }

        const token = genToken(payload);

        res.status(200).send({"response": "Data Saved !!", "token": token});
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error Occured");
    }
})


//handle get request at this endpoint(params)
router.get('/:work', async (req, res) =>{
    try{
        let work = req.params.work;
        let data = await staff.find({position: work});

        
        if(!data || data.length === 0){
            console.log('data Not Found');
            res.status(404).send('Data Not Found'); 
            return;
        }

        console.log('data sent');
        res.status(200).json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
})

//get all the data of staff
router.get('/', jwtauthMiddlewareFunction,async (req, res) =>{
    try{
       let data = await staff.find();

       
       if(!data || data.length === 0){
        console.log('data Not Found');
        res.status(404).send('Data Not Found'); 
        return;
       }

        res.status(200).json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
})

//update by email
router.put('/:updateThis', async (req, res) =>{
    try{;
        let updateThis = req.params.updateThis;
        let body = req.body;

        //if password update is present then rehash the password and replace with the old one
        if(body.password){
            body.password = await encrypt(body.password);
        }

        const response = await staff.findOneAndUpdate({"email": updateThis}, {$set: body}, {
            new: true,
            runValidators: true
        })

        if(!response){
            res.status(404).send("Not Found");
            return;
        }
        
        res.status(200).json("update successful");
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
})

//delete by id
router.delete('/:deleteThis', async (req, res) =>{
    try{
        let deleteThis = req.params.deleteThis;
        
        let response = await staff.findOneAndDelete(deleteThis)

        if(!response){
            res.status(404).send("Not Found");
            return;
        }

        res.status(200).json("deleted successfully");
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
})

module.exports = router;