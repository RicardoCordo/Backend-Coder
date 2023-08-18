import CartsManager from "../dao/mongo/manager/cart.mongoManager.js";


const getCartsController = async (req, res) => {
    try {
        const carts = await CartsManager.getCarts(req, res, req.query);
        return res.status(200).json({ status: "success", carts });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
}

const getCartController = async (req, res) => {
    try {
        const cart = await CartsManager.getCart(req.params.id);
        return res.status(200).json({ status: "success", data: cart });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
}



const createCartController = async (req, res) => {
    try {
        const createdProduct = await CartsManager.createCart(req.body);
        res.status(201).json({ status: "success", data: createdProduct });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
}

const productAddCartController = async (req, res) => {
    try {
        const cart = await CartsManager.addToCart(req.params.cid, req.params.productId)
        return res.status(200).json({ status: "success", data: cart })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

}

const updateCartController = async (req, res) => {
    try {
        const cart = await CartsManager.updateCart(req.params.cid, req.body)
        return res.status(200).json({ status: "success", data: cart })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

}


const deleteCartController = async (req, res) => {
    try {
        const cart = await CartsManager.deleteCart(req.params.cid)
        return res.status(200).json({ status: "success", data: cart })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };

}

const deleteProductCartController = async (req, res) => {
    try {
        const cart = await CartsManager.removeFromCart(req.params.cid, req.params.productId)
        return res.status(200).json({ status: "success", data: cart })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    };
}


export default {
    getCartsController,
    getCartController,
    createCartController,
    productAddCartController,
    updateCartController,
    deleteCartController,
    deleteProductCartController

}