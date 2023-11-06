import chai from "chai";
import supertest from "supertest";
import config from "../config/config.js";


const expect = chai.expect;
const port = config.port;
const requester = supertest(`http://localhost:${port}`);

describe("Sessions Tester", function () {
    const adminEmail = config.adminEmail
    const adminPass = config.adminPassword
    it("El endpoint de tipo POST a /api/sessions/register debe registrar un usuario", async function () {
        const newUser = {
            first_name: "Pepe",
            last_name: "Tester",
            email: "pepetester@gmail.com",
            age: 30,
            password: "1234",
        };

        const response = await requester
            .post("/api/sessions/register")
            .send(newUser);

        expect(response.status).to.equal(200);

    });

    it("El endpoint de tipo POST a /api/sessions/login debe iniciar sesión para un usuario registrado", async function () {
        const loginUser = {
            email: adminEmail,
            password: adminPass,
        };

        const response = await requester
            .post("/api/sessions/login")
            .send(loginUser);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", "success");
        expect(response.body).to.have.property("message", "Usuario logeado");
    });

    it("El endpoint de tipo GET a /api/sessions/current debe devolver el usuario autenticado", async function () {
        const agent = supertest.agent(`http://localhost:${port}`);
        const loginResponse = await agent.post("/api/sessions/login").send({
            email: adminEmail,
            password: adminPass,
        });
        expect(loginResponse.status).to.equal(200);

        const response = await agent.get("/api/sessions/current");
        expect(response.status).to.equal(200);
        expect(response.text).to.contain("Usuario Actual");
        expect(response.text).to.contain(adminEmail);
        expect(response.text).to.contain("admin");
    });

});