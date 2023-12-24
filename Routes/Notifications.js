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
        const [query]=await db.execute("INSERT INTO Notifications(Id_Emitator,Id_Group,Id_Interceptor ,Mesaj, Acceptat, Vizibilitate_Acceptare) VALUES(?,?,?,Ai fost invitat de catre ? pentru a participa in grupul ?,false,true)",[req.auth.id,req.params.GroupId,req.params.InvitedId,nume.Nume,numegrup.Nume]);
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




// Ruta folosita pentru acceptarea/respingerea unei invitatii pentru alaturarea unui grup
router.put('/inviteResponse/:InviteId',Autentificare, async(req,res)=>{
    const {bool}=req.body;
    try{
        if(bool){
        const [query]=await db.execute("UPDATE Notifications SET Acceptat=true AND Vizibilitate_Acceptare=true  WHERE Id=?",[req.params.InviteId]);
        }
        else{
        const [query2]=await db.execute("UPDATE Notifications SET Acceptat=false AND Vizibilitate_Acceptare=false  WHERE Id=?",[req.params.InviteId])
        }
    }catch(err){
        res.status(500).json(err);
    }
});





module.exports=router;

