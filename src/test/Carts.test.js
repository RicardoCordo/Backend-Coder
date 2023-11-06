import chai from "chai";
import supertest from "supertest";
import config from "../config/config.js";


const expect = chai.expect;
const port = config.port;
const requester = supertest(`http://localhost:${port}`);

describe("Carts Tester", () => {
    it("El endpoint de tipo GET a /api/cart debe devolver un status y payload, además el payload debe ser un arreglo", async function () {
        const response = await requester.get("/api/cart");
        expect(response.body).to.have.property("status", "success");
        expect(response.body).to.have.property("carts");
        expect(response.body.carts).to.be.an("array");
    });

    it("El endpoint de tipo GET a /api/cart/:cid debe devolverme un status y una data, además la data debe ser un objeto", async function () {

        const cartId = "64f715d2ffbbaa96cc31ed78";
        const response = await requester.get(`/api/cart/${cartId}`);
        expect(response.body).to.have.property("status", "success");
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.be.an("object");
    });

    it("El endpoint de tipo POST a /api/cart debe crear un carrito", async function () {
        const newCart = {
            products: []
        };

        const createCartResponse = await requester.post("/api/cart").send(newCart);
        expect(createCartResponse.status).to.equal(201);
        expect(createCartResponse.body).to.have.property("data");
        expect(createCartResponse.body.data).to.have.property("_id");
    });


    it("El endpoint de tipo POST a /api/cart/:cid/product/:productId debe agregar un producto al carrito", async function () {
        const cartId = "64f8987f35689bdf197e5b29";
        const productId = "651f07eedd6ac8eea742774b";
        const productToAdd = {
            quantity: 1
        };

        const agent = supertest.agent(`http://localhost:${port}`);
        const loginResponse = await agent.post("/api/sessions/login").send({
            email: "rickycordo93@gmail.com",
            password: "123",
        });
        expect(loginResponse.status).to.equal(200);
        const addProductResponse = await agent.post(`/api/cart/${cartId}/product/${productId}`).send(productToAdd);

        expect(addProductResponse.status).to.equal(200);
        expect(addProductResponse.body).to.have.property("status", "success");
        expect(addProductResponse.body).to.have.property("data");
    });
});





