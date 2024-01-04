const Data=require("../Data/Data");
const db=Data.getInstance();
const express = require("express");
const router = express.Router();
const { Autentificare } = require("../Middleware/Auth");
const {VerificareRol}=require("../Middleware/Role");



// Ruta folosita pentru atribuirea unui task cuiva de catre admin
router.post("/GActivity/:Id_Group/:Id_Membru",Autentificare,VerificareRol, async (req,res)=>{
        try{
            const {Nume,Deadline}=req.body;
            const [query]=await db.execute("INSERT INTO Group_Activity(Id_Group, Id_Membru, Nume, Status,Acceptat, Deadline) Values(?,?,?,false, false, ?)",[req.params.Id_Group,req.params.Id_Membru,Nume,Deadline]);
            const [numegrup]=await db.execute("SELECT Nume from Groupt WHERE Id_Group=?",[req.params.Id_Group]);
            const string="Ai primit un task nou in Grupul "+numegrup[0].Nume;
            const [query2]=await db.execute("INSERT INTO Notifications(Id_Group, Id_Emitator, Id_Interceptor, Mesaj, Acceptat, Vizibilitate_Acceptat) VALUES(?,?,?,?, false, true)",[req.params.Id_Group, req.auth.id, req.params.Id_Membru,string])
            res.send(200).json({Message:"Activitatea a fost atribuita!"});
        }catch(err){
            res.send(500).json(err);
        }
})


// Ruta folosita pentru a vedea task-urile dintr-un grup
router.get("/GActivity/:Id_Group",Autentificare, async (req,res)=>{
    try{
        const [verificare]=await db.execute("SELECT * FROM Members WHERE Id_Group=? AND Id_Membru=?",[req.params.Id_Group,req.auth.id]);
        
        if(verificare[0]===null){
            res.send(403).json({Message:"Utilizatorul nu face parte din grupul ales"});
        }
        const [query]=await db.execute("SELECT * FROM Group_Activity WHERE Id_Group=? AND Acceptat=true",[req.params.Id_Group]);
        
        res.send(200).json(query);
    }catch(err){
        res.send(500).json(err);
    }
})





// Ruta folosita pentru a accepta sau respinge un task atribuit tie ca membru al grupului
router.put("/GActivity/:Id_Group/:Id_Activity",Autentificare, async(req,res)=>{
    try{
        const {acceptare}=req.body;
        const [verificare]=await db.execute("SELECT * FROM Members WHERE Id_Group=? AND Id_Membru=?",[req.params.Id_Group,req.auth.id]);
        
        if(verificare[0]===null){
            res.send(403).json({Message:"Utilizatorul nu face parte din grupul ales"});
        }

        if(acceptare===false){
            const [query]=await db.execute("DELETE FROM Group_Activity WHERE Id_Activitate=?",[req.params.Id_Activity])
            res.send(200).json({Message:"Activitatea a fost respinsa"});
        }


        const [query2]=await db.execute("UPDATE Group_Activity WHERE Id_Activitate=? SET Acceptat=true",[req.params.Id_Activity]);
        res.send(200).json({Message:"Activitatea a fost acceptata"});
    }catch(err){
        res.send(500).json(err);
    }
})


// Ruta folosita pentru a sterge un task intr-un grup ca administrator
router.delete("/GActiviity/:Id_Activity",Autentificare,VerificareRol, async(req,res)=>{
    try{
        const [query]=await db.execute("DELETE FROM Group_Activity WHERE Id_Activitate=?",[req.params.Id_Activity]);
        res.send(200).json({Message:"Activitatea a fost stearsa!"});
    }catch(err){
        res.send(500).json(err);
    }
})



module.exports=router;