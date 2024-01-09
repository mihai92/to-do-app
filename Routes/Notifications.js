const Data=require("../Data/Data");
const db=Data.getInstance();
const express = require("express");
const router = express.Router();
const { Autentificare } = require("../Middleware/Auth");


// Ruta folosita pentru trimiterea unei invitatii pentru un grup
router.post("/invite/:InvitedId/:GroupId",Autentificare,async (req,res)=>{
    try{
        const [queryUser]=await db.execute("SELECT Nume FROM Users WHERE Id=?",[req.auth.id]);
        const [queryGroup]=await db.execute("SELECT Nume FROM GroupT WHERE Id=?",[req.params.GroupId]);
        const nume=queryUser[0];
        const numegrup=queryGroup[0];
        const string="Ai fost invitat de catre "+nume.Nume+" pentru a participa in grupul "+numegrup.Nume;
        const [query]=await db.execute("INSERT INTO Notifications(Id_Emitator,Id_Group,Id_Interceptor ,Mesaj, Acceptat, Vizibilitate_Acceptare, Notificare_noua) VALUES(?,?,?,?,false,true,true)",[req.auth.id, req.params.GroupId, req.params.InvitedId,string]);
    }catch(err){
        res.status(500).json(err);
    }
});


//Ruta folosita pentru primirea notificarilor
router.get("/notifications", Autentificare, async(req,res)=>{
    try{
        const [query]=await db.execute("SELECT * FROM Notifications WHERE Id_Interceptor=?",[req.auth.id]);
        res.status(200).json(query);
    }catch(err){
        res.status(500).json(err);
    }
})


//Ruta folosita pentru a modifica notificarile noi ca "vazute" dupa vizualizare
router.put("/notifications",Autentificare, async(req,res)=>{
    try{
        const [query]=await db.execute("UPDATE Notifications SET Notificare_noua=false WHERE Id_Interceptor=?",[req.auth.id]);
        res.send(200).json({Message:"Notificarile au fost vazute"});
    }catch(err){
        res.send(500).json(err);
    }
})


// Ruta folosita pentru acceptarea/respingerea unei invitatii pentru alaturarea unui grup
router.put('/inviteResponse/:InviteId',Autentificare, async(req,res)=>{
    const {bool}=req.body;
    try{
        if(bool===false){
            const [query2]=await db.execute("UPDATE Notifications SET Acceptat=false AND Vizibilitate_Acceptare=false  WHERE Id=?",[req.params.InviteId])
        }
        else{
            const [query]=await db.execute("UPDATE Notifications SET Acceptat=true AND Vizibilitate_Acceptare=false  WHERE Id=?",[req.params.InviteId]);
            const [query3]=await db.execute("SELECT Groupt.Id_Group, Groupt.Id_Admin FROM Groupt JOIN Notifications ON GroupT.Id_Group=Notifications.Id_Group WHERE Notifications.Id=?",[req.params.InviteId]);
            const [query4]=await db.execute("INSERT INTO MEMBERS(Id_Group,Id_Membru) VALUES(?,?)",[query3[0].Id_Group,req.auth.id]);
            const [query5]=await db.execute("INSERT INTO Notifications(Id_Emitator,Id_Group,Id_Interceptor ,Mesaj, Acceptat, Vizibilitate_Acceptare, Notificare_noua) VALUES(?,?,?,?,false,false,true)",[req.accepted.id,query3[0].Id_Group,query3[0].Id_Admin,"Un nou membru a venit in grupul tau"]);
    }
    res.status(200).json({Message:"Cererea a fost interceptata"});
    }catch(err){
        res.status(500).json(err);
    }
});





module.exports=router;

