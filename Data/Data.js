var instance=null;
const mysql = require("mysql2/promise");
require('dotenv').config()



class Singleton{
    constructor(){}

    static getInstance(){
        if(!instance){
            instance=mysql.createPool({
                host: process.env.HOSTDB,
                user: process.env.USERDB,
                password: process.env.PASSWORDDB,
                database: process.env.DATABASE
              });
        }
        return instance;
    }

}

module.exports=Singleton;