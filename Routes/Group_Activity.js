const Data=require("../Data/Data");
const db=Data.getInstance();
const express = require("express");
const router = express.Router();
const { Autentificare } = require("../Middleware/Auth");
const { VerificareRol }= require("../Middleware/Role");



// Ruta folosita pentru atribuirea unui task cuiva de catre admin
router.post("/GActivity/:Id_Group/:Id_Membru",Autentificare, VerificareRol, async (req,res)=>{
    try{
        const {Nume,Deadline}=req.body;
        if(req.params.Id_Membru==req.auth.id){
            const [queryauto]=await db.execute("INSERT INTO Group_Activity(Id_Group, Id_Membru, Nume, Status,Acceptat, Deadline) Values(?,?,?,?,true,?)",[req.params.Id_Group,req.params.Id_Membru,Nume,"to-do",Deadline]);
            console.log(queryauto)
            return res.status(200).json({Message:"Activitate adaugata,"})
        }
        const [query]=await db.execute("INSERT INTO Group_Activity(Id_Group, Id_Membru, Nume, Status,Acceptat, Deadline) Values(?,?,?,?, false, ?)",[req.params.Id_Group,req.params.Id_Membru,Nume,"to-do",Deadline]);
        const [numegrup]=await db.execute("SELECT Nume from Groupt WHERE Id_Group=?",[req.params.Id_Group]);
        const string="Ai primit un task nou in Grupul "+numegrup[0].Nume+": "+Nume;
        const [query_Id_Activitate]=await db.execute("SELECT Id_Activitate FROM Group_Activity WHERE Id_Group=? AND Id_Membru=? AND Nume=?",[req.params.Id_Group,req.params.Id_Membru,Nume]);
        const [query2]=await db.execute("INSERT INTO Notifications(Id_Group, Id_Emitator, Id_Interceptor, Mesaj, Acceptat, Vizibilitate_Acceptare,Task_Id) VALUES(?,?,?,?, false, true,?)",[req.params.Id_Group, req.auth.id, req.params.Id_Membru,string,query_Id_Activitate[0].Id_Activitate])
        return res.status(200).json({Message:"Done"});
    }catch(err){
        return res.status(500).json(err);
    }
})


// Ruta folosita pentru a vedea task-urile dintr-un grup
router.get("/GActivity/:Id_Group", Autentificare, async (req, res) => {
    try {
        const [verificare] = await db.execute("SELECT *  FROM Members WHERE Id_Group=? AND Id_Membru=?", [req.params.Id_Group, req.auth.id]);

        if (verificare[0] === null) {
            return res.status(403).json({ Message: "Utilizatorul nu face parte din grupul ales" });
        }
        console.log(`Fetching activities for group: ${req.params.Id_Group}`);
        const [query] = await db.execute("SELECT g.*,u.Nickname FROM Group_Activity as g, Users as u WHERE Id_Group=? AND Acceptat=true AND g.Id_Membru=u.Id", [req.params.Id_Group]);
        console.log(`Query result:`, query);
        res.status(200).json(query);
    } catch (err) {
        console.error(`Error fetching activities:`, err);
        res.status(500).json(err); // Send the error response just once
    }
});


//Ruta folosita pentru a afisa activitatile finalizate
router.get("/GActivity_Finalizat/:Id_Group",Autentificare, async(req,res)=>{
    try{
        const [query]=await db.execute("SELECT * FROM Group_Activity WHERE Status=Done AND Id_Group=?",[req.params.Id_Group]);
        res.send(200).json(query);
    }catch(err){
        res.send(500).json(err);
    }
})


// Ruta folosita pentru a accepta sau respinge un task atribuit tie ca membru al grupului
router.put("/GActivity/:Id_Group/:Id_Activity/:Id_Notification",Autentificare, async(req,res)=>{
    try{
        const {acceptare}=req.body;
        const [verificare]=await db.execute("SELECT u.Nickname FROM Members as m, Users as u WHERE m.Id_Group=? AND m.Id_Membru=? AND m.Id_Membru=u.Id",[req.params.Id_Group,req.auth.id]);
        if(!verificare.length){
            return res.status(403).json({Message:"Utilizatorul nu face parte din grupul ales"});
        }
        const [queryUpdate]=await db.execute("UPDATE Notifications SET Vizibilitate_Acceptare=false WHERE Id=?",[req.params.Id_Notification])
        const [grupAdmin]= await db.execute("SELECT Id_Admin FROM Groupt WHERE Id_Group=?",[req.params.Id_Group]);
        if(acceptare===false){
            const [query]=await db.execute("DELETE FROM Group_Activity WHERE Id_Activitate=?",[req.params.Id_Activity]);
            const string="Utilizatorul "+verificare[0].Nickname+" nu a acceptat task-ul alocat.";
            const [query2]=await db.execute("INSERT INTO Notifications(Id_Group ,Id_Emitator, Id_Interceptor,Mesaj, Acceptat, Vizibilitate_Acceptare , Task_Id) VALUES(?,?,?,?,false,false,true)",[req.params.Id_Group,req.auth.id,grupAdmin[0].Id_Admin,string]);
            return res.status(200).json({Message:"Activitatea a fost respinsa"});
        }

        const string="Utilizatorul "+verificare[0].Nickname+" si-a acceptat task-ul alocat.";
        const [query2]=await db.execute("UPDATE Group_Activity SET Acceptat=true WHERE Id_Activitate=?",[req.params.Id_Activity]);
        const [queryn]=await db.execute("INSERT INTO Notifications(Id_Group ,Id_Emitator, Id_Interceptor,Mesaj, Acceptat, Vizibilitate_Acceptare , Task_Id) VALUES(?,?,?,?,false,false,true)",[req.params.Id_Group,req.auth.id,grupAdmin[0].Id_Admin,string]);
        res.status(200).json({Message:"Activitatea a fost acceptata"});
        
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Ruta pentru schimbarea statusului unei activitati
router.put("/GActivity_Status/:Id_Activity",Autentificare, async(req,res)=>{
    try{
        const {Status}=req.body;
        const [query1]=await db.execute("UPDATE Group_Activity SET Status=? WHERE Id_Activitate=?",[Status,req.params.Id_Activity]);
        res.status(200).json({Message:"Statusul activitatii a fost schimbat cu succes"})
    }catch(err){
        res.status(500).json(err);
    }
})


// Ruta folosita pentru a sterge un task intr-un grup ca administrator
router.delete("/GActivity/:Id_Activity",Autentificare, VerificareRol, async(req,res)=>{
    try{
        const [query]=await db.execute("DELETE FROM Group_Activity WHERE Id_Activitate=?",[req.params.Id_Activity]);
        res.status(200).json({Message:"Activitatea a fost stearsa!"});
    }catch(err){
        res.status(500).json(err);
    }
})



module.exports=router;