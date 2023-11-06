import logger from "../../../utils/logger.utils.js";
import cartModel from "../models/cart.model.js";

export default class CartsDAO {
    constructor() { }
    async getCarts() {
        try {
            return cartModel.find().populate('products.productId').lean();

        } catch (error) {
            logger.error(error);
        }
    };

    async getCart(cid) {
        try {
            const cart = await cartModel.findById(cid).populate('products.productId');
            return cart;
        } catch (error) {
            logger.error(error);
        }
    }

    async createCart() {
        try {
            const createdCart = await cartModel.create({ products: [] });
            return createdCart;
        } catch (error) {
            logger.error(error);
        }
    }

    async addToCart(cid, productId, quantity = 1) {

        try {
            const cart = await cartModel.findById(cid);
            if (!cart) {
                logger.warning('No se encontró un carrito con el ID especificado.');
            }
            const existingProductIndex = cart.products.findIndex(product => product.productId.toString() === productId);

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += quantity;

            } else {
                cart.products.push({ productId, quantity });
            }

            await cart.save();
            return cart;
        } catch (error) {
            logger.error(error)
        }

    };

    async getCartByUserId(userId) {
        try {
            const cart = await cartModel.findOne({ user: userId }).populate('products.productId').lean();
            return cart;
        } catch (error) {
            logger.error(error)
        }
    };

    async updateCart(cartId, cart) {
        try {
            return await cartModel.findByIdAndUpdate(cartId, cart, { new: true });
        } catch (error) {
            logger.error(error)
        }
    };

    async deleteCart(req, res) {
        try {
            return cartModel.findByIdAndDelete(req.params.cid);
        } catch (error) {
            logger.error(error)
        }
    };

    async removeFromCart(req, res) {
        try {

            const cart = await cartModel.findById(req.params.cid);
            const productIndex = cart.products.findIndex(product => product.productId.toString() === req.params.productId);
            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1);

                await cart.save();

                logger.info("Producto fue removido exitosamente");
            } else {
                logger.warning("Este producto no esta en el carrito");
            }
        } catch (error) {
            logger.error(error)
        }
    };
}

