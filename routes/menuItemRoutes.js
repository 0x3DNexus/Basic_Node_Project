let express = require('express');
let router = express.Router();
let menu = require('./../models/menu.js');

//handle post request at this endpoint
router.post('/', async (req, res) =>{
    try{
        const recievedData = req.body;

        const Menu = new menu(recievedData);

        await Menu.save();
        res.status(200).send("Data Saved");
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error Occured");
    }
})

//handle get request at this endpoint(param)
router.get('/:foodName', async (req, res) =>{
    try{
        let foodName = req.params.foodName;
        console.log(foodName);
        let data = await menu.find({name: foodName})

        if(!data || data.length === 0){
           console.log('data Not Found');
           res.status(404).send('Data Not Found'); 
           return;
        }

        console.log(data);
        res.status(200).json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
})

//get all the items

router.get('/', async (req, res) =>{
    console.time();
    try{
        let data = await menu.find()
        console.log(data);

        
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
    console.timeEnd();
})


//handle put request at this endpoint
router.put('/:foodUpadteById', async (req, res)=>{
    try{
        let foodId = req.params.foodUpadteById;
        let body = req.body;

        const response = await menu.findByIdAndUpdate(foodId, body, {
            new: true,
            runValidators: true
        });

        if(!response){
            res.status(404).send("Not Found");
            return;
        }

        res.status(200).send("Data Updated")
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
})

router.delete('/:deleteId', async (req, res) =>{
    try{
        let deleteId = req.params.deleteId;
        let response = await menu.findByIdAndDelete(deleteId);

        if(!response){
            res.status(404).send("Not Found");
            return;
        }

        res.status(200).send("Data Deleted")
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
})

module.exports = router;
