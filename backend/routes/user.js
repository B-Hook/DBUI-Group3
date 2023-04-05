const express = require("express");
const router = express.Router();
const control = require("../controllers/user");

router.post('/', async(req, res, next)=>{
    try{
        const results = await control.createUser(req.models.user, req.body);
        res.status(201).json(results);
    }
    catch(errors){
        console.error(`error ${errors}`);
        res.status(500).json({message: errors.toString()})
    }
    next();
});

module.exports = router;
