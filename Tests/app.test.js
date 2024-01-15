const request=require("supertest");
const app=require("../Index");


describe("Todo_Groups Backend", ()=>{
    var authtoken;

    beforeAll(async () => {
        const loginResponse = await request(app)
            .post("/login")
            .send({
                Email: "martian@yahoo.com",
                Password: "1234"
            });

        authToken = loginResponse.body.token; 
    });

    it("POST /login ---->token", ()=>{
        return request(app)
        .post("/login")
        .send({
            Email:"martian@yahoo.com",
            Password:"1234"
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    token:expect.any(String)
                })
            )
        })
    })
    
    

    it("POST /Todo  ------>mesaj: activitate creata",()=>{
        return request(app)
        .post("/Todo")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
            Name:"o activitate",
            Deadline:"2024.01.30"
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    Message:"Activitate adaugata"
                })
            )
        })
    })

    it("GET /Todo ---->lista cu activitatile", ()=>{
        return request(app)
        .get("/Todo")
        .set("Authorization", `Bearer ${authToken}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    Id:expect.any(Number),
                    Id_User:expect.any(Number),
                    Nume:expect.any(String),
                    Status:expect.any(Boolean),
                    Deadline:expect.any(Date)
                })
            )
        })
    })

    
    it("PUT /Todo ---->mesaj:Statusul a fost schimbat cu succes", ()=>{
        return request(app)
        .put("/Todo/1")
        .set("Authorization", `Bearer ${authToken}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    Message:"Statusul a fost schimbat cu succes"
                })
            )
        })
    })

    
    it("DELETE /Todo ---->mesaj:Activitatea a fost stearsa cu succes", ()=>{

        return request(app)
        .delete("/Todo/1")
        .set("Authorization", `Bearer ${authToken}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    Message:"Activitatea a fost stearsa cu succes."
                })
            )
        })

    })


    it("POST /group  ------>mesaj: Cererea a trecut cu succes",()=>{
        return request(app)
        .post("/Todo")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
            Nume:"Un grup"
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    Message:"Cererea a trecut cu succes"
                })
            )
        })
    })




})