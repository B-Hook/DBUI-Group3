const bcrypt= require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const acessTokenSecret = process.env.TOKEN_SECRET;

const authenticationUser = async(user, body)=>{
    const username = body.username;
    const auth = await user.authenticateUser(username, body.password);
    if(auth === false){
        return null;
    }

    const user1 = await findUserByUsername(user, username);
    const acessToken = jwt.sign({...user1}, acessTokenSecret);
    return acessToken;
}

const findUserByUsername = async(user, username)=>{
    const user1 = await user.getUserId(username);
    delete user1.password;
    return user1;
}

const createUser = async(user, body) =>{
    body.password = bcrypt.hashSync(body.password, 10);
    const result = await user.createNewUser(body);
    delete result.password;
    return result;
}

module.exports ={
    authenticationUser,
    findUserByUsername,
    createUser
}
