import cartModel from "../models/cart.model.js";

export default class CartsDAO {
    constructor() { }
    async getCarts() {
        try {
            return cartModel.find().populate('products.productId').lean();

        } catch (error) {
            return res.status(500).json({ error: err.message });
        }
    };

    async getCart(cid) {
        try {
            return await cartModel.findById(cid).populate('products.productId')

        } catch (error) {
            return res.status(500).json({ error: err.message });
        }
    };

    async createCart() {
        try {
            return await cartModel.create({ products: [] });
        } catch (error) {
            return res.status(500).json({ error: err.message });
        }
    };

    async addToCart(cid, productId) {

        try {
            const cart = await cartModel.findById(cid);
            const existingProduct = cart.products.find(products => products.productId.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ productId, quantity: 1 });
            }
            await cart.save();
        } catch (error) {
            return res.status(500).json({ error: err.message });
        }

    };

    async updateCart(req, res) {
        try {
            return await cartModel.findByIdAndUpdate(req.params.cid, req.params.cart, { new: true });
        } catch (error) {
            return res.status(500).json({ error: err.message });
        }
    };

    async deleteCart(req, res) {
        try {
            return cartModel.findByIdAndDelete(req.params.cid);
        } catch (error) {
            return res.status(500).json({ error: err.message });
        }
    };

    async removeFromCart(req, res) {
        try {

            const cart = await cartModel.findById(req.params.cid);
            const productIndex = cart.products.findIndex(product => product.productId.toString() === req.params.productId);
            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1);

                await cart.save();

                console.log("Producto fue removido exitosamente");
            } else {
                console.log("Este producto no esta en el carrito");
            }
        } catch (error) {
            return res.status(500).json({ error: err.message });
        }
    };
}

