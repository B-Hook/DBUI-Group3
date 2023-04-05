require("dotenv").config();

//Config settign for DB
module.exports={
    development: {
        client :"mysql",
        debug: true,
        connection:{
            host:process.env.host,
            user:process.env.user,
            port:process.env.port,
            password:process.env.password,
            database:process.env.database,
            ssl: true
        },
        pool: {
            min:0,
            max: 15
        }
    }
}