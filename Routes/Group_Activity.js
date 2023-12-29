const Data=require("../Data/Data");
const db=Data.getInstance();
const express = require("express");
const router = express.Router();
const { Autentificare } = require("../Middleware/Auth");
const {VerificareRol}=require("../Middleware/Role");


router.post("/GActivity/:Id_Group/:Id_Membru",Autentificare,VerificareRol, async (req,res)=>{
        try{
            const {Nume,Deadline}=req.body;
            const [query]=await db.execute("INSERT INTO Group_Activity(Id_Group, Id_Membru, Nume, Status, Deadline) Values(?,?,?, false, ?)",[req.params.Id_Group,req.params.Id_Membru,Nume,Deadline]);
            const string=""
            const [query2]=await db.execute("INSERT INTO Notifications(Id_Group, Id_Emitator, Id_Interceptor, Mesaj, Acceptat, Vizibilitate_Acceptat) VALUES(?,?,?,?, false, true)",[req.params.Id_Group, req.auth.id, req.params.Id_Membru,string])
            res.send(200).json({Message:"Activitatea a fost atribuita!"});
        }catch(err){
            res.send(500).json(err);
        }
})

router.put("/GActivity/:Id_Activity",Autentificare, async(req,res)=>{
    try{
        const {acceptare}=req.body;


        res.send(200).json({Message:"Activitatea a fost acceptata"});
    }catch(err){
        res.send(500).json(err);
    }
})

router.delete("/GActiviity/:Id_Activity",Autentificare,VerificareRol, async(req,res)=>{
    try{
        const [query]=await db.execute("DELETE FROM Group_Activity WHERE Id_Activitate=?",[req.params.Id_Activity]);
        res.send(200).json({Message:"Activitatea a fost stearsa!"});
    }catch(err){
        res.send(500).json(err);
    }
})



module.exports=router;