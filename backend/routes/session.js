const express = require("express");
const router = express.Router();

const control = require("../controllers/user");
const {authenticateJwt} = require("../middleware/authentication");

router.post('/', async(req, res, next)=>{
    try{
        const results = await control.authenticationUser(req.models.user, req.body);
        if(results === null){
            res.status(401).json({message: "Invalid login credential"})

        }
        else{
            res.status(201).json(results);
        }
    }
    catch(errors){
        console.error(`error ${errors}`);
        res.status(500).json({message: errors.toString()})
    }
    next();
});

router.get('/',authenticateJwt, async(req, res, next)=>{
    try{
        res.status(201).json(req.user);
    }

    catch(errors){
        console.error(`error ${errors}`);
        res.status(500).json({message: errors.toString()})
    }
    next();
});

module.exports = router;
