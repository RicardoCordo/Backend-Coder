import chai from "chai";
import supertest from "supertest";
import config from "../config/config.js";
import productModel from "../dao/mongo/models/product.model.js";

const expect = chai.expect;
const port = config.port;
const requester = supertest(`http://localhost:${port}`);

describe("Products Tester", () => {
    const adminEmail = config.adminEmail;
    const adminPassword = config.adminPassword;
    let createdProductId;

    it("El endpoint de tipo GET a /api/products debe devolverme un status y payload, además el payload debe ser un arreglo", async function () {
        const response = await requester.get("/api/products");
        expect(response.body).to.have.property("status", "success");
        expect(response.body).to.have.property("products");
        expect(response.body.products).to.be.an("array");
    });

    it("El endpoint de tipo GET a /api/products/:id debe devolverme un status y una data, además la data debe ser un objeto", async function () {
        const productId = "651f07eedd6ac8eea742774b";
        const response = await requester.get(`/api/products/${productId}`);
        expect(response.body).to.have.property("status", "success");
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.be.an("object");
    });

    it("El endpoint de tipo POST a /api/products debe crear un producto si el usuario es un admin", async function () {
       

        const agent = supertest.agent(`http://localhost:${port}`);
        const loginResponse = await agent.post("/api/sessions/login").send({
            email: adminEmail,
            password: adminPassword,
        });

        expect(loginResponse.status).to.equal(200);

        const newProduct = {
            title: "producto Test",
            description: "descripcion producto Test",
            code: "codigo test",
            price: "1000",
            stock: "100",
            category: "Categoría Test",
        };

        const createProductResponse = await agent.post("/api/products").send(newProduct);
        expect(createProductResponse.status).to.not.equal(500);
        expect(createProductResponse.body).to.have.property("data");
        expect(createProductResponse.body.data).to.have.property("_id");

        createdProductId = createProductResponse.body.data._id;
    });

    it("El endpoint de tipo DELETE a /api/products/:id debe eliminar un producto si el usuario es un admin", async function () {
        const agent = supertest.agent(`http://localhost:${port}`);
        const loginResponse = await agent.post("/api/sessions/login").send({
            email: adminEmail,
            password: adminPassword,
        });

        expect(loginResponse.status).to.equal(200);
        const deleteProductResponse = await agent.delete(`/api/products/${createdProductId}`);
        expect(deleteProductResponse.status).to.equal(200);
        expect(deleteProductResponse.body).to.have.property("message", "Producto eliminado con éxito");
    });
});




