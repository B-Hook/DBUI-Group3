const requestLog = async(req, res, next) =>{
    const method = req.method;
    const url = req.protocol +"://"+ req.get("host")+ req.originalUrl;
    const timeStamp = Date.now()
    console.log(method,url, timeStamp);
    next();
}

module.exports = requestLog;