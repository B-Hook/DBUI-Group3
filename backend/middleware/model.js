const user = require("../models/users");

const createModelsMiddleware = async(req, res, next) =>{
    req.models = {
        user : new user
    }
    next();
}

module.exports = {
    createModelsMiddleware
}