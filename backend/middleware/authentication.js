const jwt = require("jsonwebtoken");
const acessTokenSecret = process.env.TOKEN_SECRET;

const authenticateJwt= (req, res, next)=>{
    const header = req.headers.authorization;
    if(!header){
        return res.sendStatus(401);
    }

    const token = header.split(" ")[1];
    jwt.verify(token, acessTokenSecret, (errors, user)=>{
        if(errors){
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    })
};

module.exports ={
    authenticateJwt
}