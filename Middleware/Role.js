const Data=require("../Data/Data");
const db=Data.getInstance();

async function VerificareRol(req,res,next){
    try{
        const rol=await db.execute("SELECT Id_Admin FROM GroupT WHERE Id_Admin=?",[req.auth.id]);
        if(rol.Id_Admin==null){
            res.send(403).json({message:"Autorizare respinsa"})
        }
        else{
            next();
        }
    }catch(err){
        res.send(500).json(err);
    }
}

module.exports={VerificareRol};