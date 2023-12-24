const Data=require("../Data/Data");
const db=Data.getInstance();
const express = require("express");
const router = express.Router();
const { Autentificare } = require("../Middleware/Auth");
const {VerificareRol}=require("../Middleware/Role");


// Ruta folosita pentru a crea un grup
router.post("/group",Autentificare,async (req,res)=>{
    const {Nume}=req.body;
    try{
        const [query]=await db.execute("INSERT INTO GroupT(Id_Admin,Nume) VALUES(?,?)",[req.auth.id,Nume]);
        res.status(200).json({message:"Cererea a trecut cu succes"});
    }catch(err){
        res.status(500);
    }
})

// Ruta folosita pentru a primi o lista cu grupurile din care un utilizator face parte
router.get("/group",Autentificare,async (req,res)=>{
    try{
    const [query]=await db.execute("SELECT * FROM GroupT as g,Members as m WHERE g.Id_Group=m.Id_Group AND Id_Membru=?",[req.auth.id]);
    res.status(200).json(query);
    }catch(err){
        res.status(500).json(err);
    }
})



// Ruta folosita pentru a sterge un grup
router.delete("/group/:Id_Group", Autentificare, VerificareRol, async(req,res)=>{
    try{
        const [query]=await db.execute("DELETE FROM GroupT WHERE Id_Group=?",[req.params.Id_Group]);
        res.status(200).json({Message:"Grupul a fost sters cu succes"});
    }catch(err){
        res.status(500).json(err);
    }
})


// Ruta folosita pentru a schimba numele unui grup
router.put("/group/:Id_Group", Autentificare, VerificareRol, async(req,res)=>{
    const {Nume}=req.body;
    try{
        const [query]=await db.execute("UPDATE GroupT SET Nume=? WHERE Id_Group=?",[Nume,req.params.Id_Group]);
        res.status(200).json({Message:"Numele grupului a fost schimbat cu succes"});
    }catch(err){
        req.status(500).json(err);
    }
})



module.exports=router;