const Data=require("../Data/Data");
const db=Data.getInstance();
const express = require("express");
const router = express.Router();
const { Autentificare } = require("../Middleware/Auth");



// Ruta folosita pentru a crea un grup
router.post("/group",Autentificare,async (req,res)=>{
    const {Nume}=req.body;
    try{
        const [query]=await db.execute("INSERT INTO GroupT(Id_Admin,Nume) VALUES(?,?)",[req.auth.id,Nume]);
        const [grup]=await db.execute("SELECT Id_Group FROM GroupT WHERE Id_Admin=?",[req.auth.id]);
        const [query2]=await db.execute("INSERT INTO Members(Id_Group,Id_Membru) VALUES(?,?)",[grup[0].Id_Group,req.auth.id]);
        res.status(200).json({message:"Cererea a trecut cu succes"});
    }catch(err){
        res.status(500);
    }
})


router.get("/members/:Id_Group",Autentificare, async(req,res)=>{
    try{
        const[query]=await db.execute("SELECT * FROM Members WHERE Id_Group=?",[req.params.Id_Group]);
        res.status(200).json(query);
    }catch(err){
        res.status(500).json(err);
    }
})


//Ruta folosita pentru a cauta un utilizator in momentul in care acesta trebuie adaugat 
router.get("/people/:Nickname",Autentificare, async (req,res)=>{
    try{
        const [query]=await db.execute("SELECT * FROM Users WHERE Nickname LIKE=?",[req.params.Nickname]);
        res.send(200).json(query);
    }catch(err){
        res.send(500).json(err);
    }
});


// Ruta folosita pentru a primi o lista cu grupurile din care un utilizator face parte
router.get("/group",Autentificare,async (req,res)=>{
    try{
        const [query]=await db.execute("SELECT * FROM GroupT AS g JOIN Members AS m ON g.Id_Group = m.Id_Group       WHERE m.Id_Membru = ?",[req.auth.id]);
        res.status(200).json(query);
    }catch(err){
        res.status(500).json(err);
    }
})

//Ruta folosita pentru a sterge un membru din grup
router.delete("/member/:Id_Group/:Id_Membru", Autentificare, async(req,res)=>{
    try{
        const [query]=await db.execute("DELETE FROM Members WHERE Id_Group=? AND Id_Membru=?",[req.params.Id_Group,req.params.Id_Membru])
        res.status(200).json({Message:"Utilizatorul a fost sters cu succes"});
    }catch(err){
        res.status(200).json(err);
    }
})


// Ruta folosita pentru a sterge un grup
router.delete("/group/:Id_Group", Autentificare, async(req,res)=>{
    try{
        const [query]=await db.execute("DELETE FROM GroupT WHERE Id_Group=?",[req.params.Id_Group]);
        res.status(200).json({Message:"Grupul a fost sters cu succes"});
    }catch(err){
        res.status(500).json(err);
    }
})


// Ruta folosita pentru a schimba numele unui grup
router.put("/group/:Id_Group", Autentificare, async(req,res)=>{
    const {Nume}=req.body;
    try{
        const [query]=await db.execute("UPDATE GroupT SET Nume=? WHERE Id_Group=?",[Nume,req.params.Id_Group]);
        res.status(200).json({Message:"Numele grupului a fost schimbat cu succes"});
    }catch(err){
        req.status(500).json(err);
    }
})



module.exports=router;