const bcrypt= require("bcryptjs");
const knex = require("../db/knex");
const table = "Users";

class user {
    async createNewUser(body){
        // deep copy use ...
        await knex(table).insert({...body});
        const result = await this.getUserId(body.username);
        return result;
    }
    async getUserId(username){
        let result = await knex(table).where({username});
        result = result[0];
        return result;
    }
    async authenticateUser(username, password){
        const user = await this.getUserId(username);
        if(!user){
            console.error(`username not found ${username}`)
            return false;
        }
        const isValid = await bcrypt.compare(password, user.password);
        return isValid;
    }
}

module.exports = user;

