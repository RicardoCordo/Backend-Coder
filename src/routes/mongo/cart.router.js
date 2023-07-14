import { Router } from "express";
import CartsManager from "../../dao/mongo/manager/cart.js"

const router = Router();
const cartsManager = new CartsManager();

router.get("/", async (req, res) => {
    const carts = await cartsManager.getCarts(req, res, req.query);
    res.json({ status: "ok", data: carts });
});

router.get("/:cid", async (req, res) => {
    const cart = await cartsManager.getCart(req.params.id);
    res.json({ status: "ok", data: cart });
});

router.post("/", async (req, res) => {
    const createdProduct = await cartsManager.createCart(req.body);
    res.status(201).json({ status: "ok", data: createdProduct });
});

router.post('/:id/product/:productId', async (req, res) => {
    const cart = await cartsManager.addToCart(req.params.id, req.params.productId)
    res.json({ status: 200, data: cart })

})

router.put('/:id', async (req, res) => {
    const cart = await cartsManager.updateCart(req.params.id, req.body)
    res.json({ status: 200, data: cart })

})


router.delete('/:cid', async (req, res) => {
    const cart = await cartsManager.deleteCart(req.params.id)
    res.json({ status: 200, data: cart })

})

router.delete('/:cid/product/:productId', async (req, res) => {
    const cart = await cartsManager.removeFromCart(req.params.id, req.params.productId)
    res.json({ status: 200, data: cart })
})

export default router;