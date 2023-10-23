const Data=require("../Data/Data");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db=Data.getInstance();
require('dotenv').config()


router.post("/Login", async (req,res)=>{
    const {Email,Password}=req.body;
    try{
        const [query]=await db.execute("SELECT * FROM Users WHERE Email=? & Password=?",[Email,Password])
        
        if(query.length==0){
            res.status(401).json({Mesaj:"Credidentiale invalide"});
        }

        const potrivire = await bcrypt.compare(Password, query[0].Password);
        if (!potrivire) {
            return res.status(401).json({ message: "Credidentiale invalide" });
        }

        const token=jwt.sign({ id: query[0].Id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" })
        res.status(200).json(token);
        

    }
    catch(err){
        res.status(500).json(err);
    }
});

router.post("/SignUp", async(req,res)=>{
    const {Email,DOB,PhoneNumber, Password}=req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);
    
    try{
        const [query]=await db.execute("INSERT INTO Users(Email,DOB,PhoneNumber, Password) VALUES (?, ?, ?,?)",[Email, DOB, PhoneNumber, hashedPassword]);
        res.status(200).json({ message: "Utilizator creat" });
    }
    catch(err){
        res.status(500).json(err);
    }
})




module.exports=router;