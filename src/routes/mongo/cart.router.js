import { Router } from "express";
import { cartsManager } from "../../dao/mongo/manager/cart.js"

const router = Router();

router.get("/", async (req, res) => {
    try {
        const carts = await cartsManager.getCarts(req, res, req.query);
        return res.status(200).json({ status: "success", carts });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
});

router.get("/:cid", async (req, res) => {
    try {
        const cart = await cartsManager.getCart(req.params.id);
        return res.status(200).json({ status: "success", data: cart });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
});

router.post("/", async (req, res) => {
    try {
        const createdProduct = await cartsManager.createCart(req.body);
        res.status(201).json({ status: "success", data: createdProduct });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
});

router.post('/:cid/product/:productId', async (req, res) => {
    try {
        const cart = await cartsManager.addToCart(req.params.cid, req.params.productId)
        return res.status(200).json({ status: "success", data: cart })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

});

router.put('/:cid', async (req, res) => {
    try {
        const cart = await cartsManager.updateCart(req.params.cid, req.body)
        return res.status(200).json({ status: "success", data: cart })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

});


router.delete('/:cid', async (req, res) => {
    try {
        const cart = await cartsManager.deleteCart(req.params.cid)
        return res.status(200).json({ status: "success", data: cart })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

});

router.delete('/:cid/product/:productId', async (req, res) => {
    try {
        const cart = await cartsManager.removeFromCart(req.params.cid, req.params.productId)
        return res.status(200).json({ status: "success", data: cart })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
});
export default router;