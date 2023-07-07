import { Router } from "express";
import CartsManager from "../../dao/mongo/manager/cart.js";

const router = Router();
const cartsManager = new CartsManager();

router.get("/", async (req, res) => {
    const carts = await cartsManager.getCart();
    res.json({ status: "ok", data: carts });
});

router.get("/:id", async (req, res) => {Cart
    const { id } = req.params;
    const cart = await cartsManager.getCart(id);
    res.json({ status: "ok", data: cart });
});

router.post("/", async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ status: "error", message: "No data sent!" });
    }
    const createdProduct = await cartsManager.createCart({
        products:[],
    });
    res.status(201).json({ status: "ok", data: createdProduct });
});


export default router;