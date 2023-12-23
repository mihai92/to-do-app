const Data=require("../Data/Data");
const db=Data.getInstance();
const express = require("express");
const router = express.Router();
const { Autentificare } = require("../Middleware/Auth");


router.post("/group",Autentificare,async (req,res)=>{
    const {Nume}=req.body;
    try{
        const [query]=await db.execute("INSERT INTO GroupT(Id_Admin,Nume) VALUES(?,?)",[req.auth.id,Nume]);
        res.status(200).json({message:"Cererea a trecut cu succes"});
    }catch(err){
        res.status(500);
    }
})

router.get("/group",Autentificare,async (req,res)=>{
    try{
    const [query]=await db.execute("SELECT * FROM GroupT as g,Members as m WHERE g.Id_Group=m.Id_Group AND Id_Membru=?",[req.auth.id]);
    res.status(200).json(query);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports=router;