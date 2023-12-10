const Data=require("../Data/Data");
const express = require("express");
const router = express.Router();
const db=Data.getInstance();
const { Autentificare } = require("../Middleware/Auth");





router.post("/Todo",Autentificare, async(req,res)=>{
    const {Name,Deadline}=req.body;
    try{
        const [query]=await db.execute("INSERT INTO Activity(Nume,Deadline,Status,Id_User) VALUES(?,?,?,?)",[Name,Deadline,false,req.auth.id,]);
        res.status(200).json({Message:"Activitate adaugata"});
    }catch(err){
        res.status(500).json(err);
    }
});


router.get("/Todo",Autentificare, async(req,res)=>{
    try{
        const [query]=await db.execute("SELECT * FROM Activity WHERE Id_User=?",[req.auth.id]);
        res.status(200).json(query);
    }catch(err){
        res.status(500).json(err);
    }
});


router.delete("/Todo/:Id",Autentificare, async(req,res)=>{
    try{
        console.log(req.params.Id)
        const [query]=await db.execute("DELETE FROM Activity WHERE Id_Activitate=?",[req.params.Id]);
        res.status(200).json({Message:"Activitatea a fost stearsa cu succes."})
    }catch(err){
        res.status(500).json(err);
    }

});


router.put("/Todo/:Id",Autentificare, async(req,res)=>{
    const {Name}=req.body;
    try{
        const [query]=await db.execute("UPDATE Activity SET Name=? WHERE Id_Activitate=?",[Name,req.params.Id]);
        res.status(200).json({Message:"Activitatea a fost actualizata"});
    }catch(err){
        res.status(500).json(err);
    }
});


router.put("/TodoStatus/:Id", Autentificare, async(req,res)=>{
    try{
        const [query]=await db.execute("UPDATE Activity SET Status=True WHERE Id_Activitate=?",[req.params.Id]);
        res.status(200).json({Message:"Statusul a fost schimbat cu succes"});
    }catch(err){
        res.status(500).json(err);
    }
})



module.exports=router;