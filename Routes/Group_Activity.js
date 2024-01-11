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
            const [query]=await db.execute("INSERT INTO Group_Activity(Id_Group, Id_Membru, Nume, Status,Acceptat, Deadline) Values(?,?,?,?, false, ?)",[req.params.Id_Group,req.params.Id_Membru,Nume,"In progress",Deadline]);
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


router.get("/GActivity_Finalizat/:Id_Group",Autentificare,VerificareRol, async(req,res)=>{
    try{
        const [query]=await db.execute("SELECT * FROM Group_Activity WHERE Status=true AND Id_Group=?",[req.params.Id_Group]);
        res.send(200).json(query);
    }catch(err){
        res.send(500).json(err);
    }
})


// Ruta folosita pentru a accepta sau respinge un task atribuit tie ca membru al grupului
router.put("/GActivity/:Id_Group/:Id_Activity",Autentificare, async(req,res)=>{
    try{
        const {acceptare}=req.body;
        const [verificare]=await db.execute("SELECT u.Nume FROM Members as m, Users as u WHERE m.Id_Group=? AND m.Id_Membru=? AND m.Id_Membru=s.Id",[req.params.Id_Group,req.auth.id]);
        if(!verificare.length){
            res.send(403).json({Message:"Utilizatorul nu face parte din grupul ales"});
        }
        const [grupAdmin]= await db.execute("SELECT Id_Admin FROM Groupt WHERE Id_Group=?",[req.params.Id_Group]);
        if(acceptare===false){
            const [query]=await db.execute("DELETE FROM Group_Activity WHERE Id_Activitate=?",[req.params.Id_Activity]);
            const string="Utilizatorul "+verificare[0].Nume+" nu a acceptat task-ul alocat.";
            const [query2]=await db.execute("INSERT INTO Notifications(Id_Group ,Id_Emitator, Id_Interceptor,Mesaj, Acceptat, Vizibilitate_Acceptare , Notificare_noua) VALUES(?,?,?,?,false,false,true)",[req.params.Id_Group,req.auth.id,grupAdmin[0].Id_Admin,string]);
            res.send(200).json({Message:"Activitatea a fost respinsa"});
        }

        const string="Utilizatorul "+verificare[0].Nume+" si-a acceptat task-ul alocat.";
        const [query2]=await db.execute("UPDATE Group_Activity WHERE Id_Activitate=? SET Acceptat=true",[req.params.Id_Activity]);
        const [queryn]=await db.execute("INSERT INTO Notifications(Id_Group ,Id_Emitator, Id_Interceptor,Mesaj, Acceptat, Vizibilitate_Acceptare , Notificare_noua) VALUES(?,?,?,?,false,false,true)",[req.params.Id_Group,req.auth.id,grupAdmin[0].Id_Admin,string]);
        res.send(200).json({Message:"Activitatea a fost acceptata"});
        
    }catch(err){
        res.send(500).json(err);
    }
})

//Ruta pentru schimbarea statusului unei activitati
router.put("/GActivity_Status/:Id_Activity",Autentificare, async(req,res)=>{
    try{
        const {Status}=req.body;
        const [query1]=await db.execute("UPDATE Group_Activity WHERE Id_Activitate=? SET Status=?",[req.params.Id_Activity,Status]);
        res.status(200).json({Message:"Statusul activitatii a fost schimbat cu succes"})
    }catch(err){
        res.status(500).json(err);
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