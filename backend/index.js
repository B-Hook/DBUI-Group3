const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const requestLog = require("./middleware/logging");
const{ createModelsMiddleware} = require("./middleware/model");

const user = require('./routes/user');
const session = require('./routes/session');

const app = express();
const port = 8000;

app.use(cors());
app.use(createModelsMiddleware);
app.use(requestLog);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/user", user);
app.use("/session", session);

app.listen(port,()=>{
    console.log(`This app is listening on the post ${ port }`);
});
