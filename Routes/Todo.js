const Data=require("../Data/Data");
const express = require("express");
const router = express.Router();
const db=Data.getInstance();
const { Autentificare } = require("../Middleware/Auth");


// Toate rutele de aici sunt folosite pentru a gestiona activitati in modul "personal" al aplicatiei

// Ruta folosita pentru a adauga o activitate noua 
router.post("/Todo",Autentificare, async(req,res)=>{
    const {Name,Deadline}=req.body;
    try{
        const [query]=await db.execute("INSERT INTO Activity(Nume,Deadline,Status,Id_User) VALUES(?,?,?,?)",[Name,Deadline,false,req.auth.id,]);
        res.status(200).json({Message:"Activitate adaugata"});
    }catch(err){
        res.status(500).json(err);
    }
});


// Ruta folosita pentru a primi o lista cu activitatile create de un utilizator
router.get("/Todo",Autentificare, async(req,res)=>{
    try{
        const [query]=await db.execute("SELECT * FROM Activity WHERE Id_User=?",[req.auth.id]);
        res.status(200).json(query);
    }catch(err){
        res.status(500).json(err);
    }
});



// Ruta folosita pentru a sterge o activitate
router.delete("/Todo/:Id",Autentificare, async(req,res)=>{
    try{
        console.log(req.params.Id)
        const [query]=await db.execute("DELETE FROM Activity WHERE Id_Activitate=?",[req.params.Id]);
        res.status(200).json({Message:"Activitatea a fost stearsa cu succes."})
    }catch(err){
        res.status(500).json(err);
    }

});

// Ruta folosita pentru a modifica numele unei activitati
router.put("/Todo/:Id",Autentificare, async(req,res)=>{
    const {Name}=req.body;
    try{
        const [query]=await db.execute("UPDATE Activity SET Nume=? WHERE Id_Activitate=?",[Name,req.params.Id]);
        res.status(200).json({Message:"Activitatea a fost actualizata"});
    }catch(err){
        res.status(500).json(err);
    }
});

//Ruta folosita pentru a schimba statusul unei activitati
router.put("/TodoStatus/:Id", Autentificare, async(req,res)=>{
    const {Status}=req.body;
    try{
        const [query]=await db.execute("UPDATE Activity SET Status=? WHERE Id_Activitate=?",[Status,req.params.Id]);
        res.status(200).json({Message:"Statusul a fost schimbat cu succes"});
    }catch(err){
        res.status(500).json(err);
    }
})



module.exports=router;