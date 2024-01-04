const Data=require("./Data/Data");
const db=Data.getInstance();

  

async function createTable(){
try{
    await db.query
    ("CREATE TABLE IF NOT EXISTS Users (Id INT AUTO_INCREMENT PRIMARY KEY, Nickname VARCHAR(250),   Email VARCHAR(250), DOB DATE, PhoneNumber VARCHAR(250),   Password VARCHAR(250))");
    await db.query
    ("CREATE TABLE IF NOT EXISTS Activity (Id_Activitate INT AUTO_INCREMENT PRIMARY KEY,        Id_User INT,        Nume VARCHAR(250),        Status BOOLEAN,        Deadline DATE,        FOREIGN KEY (Id_User) REFERENCES Users(Id)    )");
    await db.query
    ("CREATE TABLE IF NOT EXISTS GroupT (Id_Group INT AUTO_INCREMENT PRIMARY KEY,        Id_Admin INT,        Nume VARCHAR(250),        FOREIGN KEY (Id_Admin) REFERENCES Users(Id))");
    await db.query
    ("CREATE TABLE IF NOT EXISTS Members(Id INT AUTO_INCREMENT PRIMARY KEY, Id_Group INT, Id_Membru INT, FOREIGN KEY(Id_Group) REFERENCES GroupT(Id_Group), FOREIGN KEY(Id_Membru) REFERENCES Users(Id) ) ");
    await db.query
    ("CREATE TABLE IF NOT EXISTS Group_Activity( Id_Activitate INT AUTO_INCREMENT PRIMARY KEY,  Id_Group INT, Id_Membru INT,    Nume VARCHAR(250), Status BOOLEAN, Deadline DATE, Acceptat BOOLEAN, FOREIGN KEY(Id_Group) REFERENCES Members(Id_Group), FOREIGN KEY (Id_Membru) REFERENCES Members(Id_Membru)   )")
    await db.query
    ("CREATE TABLE IF NOT EXISTS Notifications(Id INT AUTO_INCREMENT PRIMARY KEY,Id_Group INT,    Id_Emitator INT,      Id_Interceptor INT,   Mesaj VARCHAR(250), Acceptat BOOLEAN, Vizibilitate_Acceptare BOOLEAN  , Notificare_noua BOOLEAN,   FOREIGN KEY(Id_Emitator) REFERENCES Users(Id),      FOREIGN KEY(Id_Interceptor) REFERENCES Users(Id),   FOREIGN KEY(Id_Group) REFERENCES GroupT(Id_Group))");
    await db.end();
}catch(err){
    console.log(err);
}
}
createTable();
console.log("Baza de date este generata!");

