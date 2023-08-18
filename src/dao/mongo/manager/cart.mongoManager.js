import cartModel from "../models/cart.model.js";

export default class CartsManager {
    static getCarts = async () => {
        return cartModel.find().populate('products.productId').lean();
    };

    static getCart = async (cid) => {
        return await cartModel.findById(cid).populate('products.productId')
    };

    static createCart = async () => {
        return await cartModel.create({ products: [] });
    };

    static addToCart = async (cid, productId) => {

        const cart = await cartModel.findById(cid);
        const existingProduct = cart.products.find(products => products.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ productId, quantity: 1 });
        }


        await cart.save();
    }

    static updateCart = async (cid, cart) => {
        return await cartModel.findByIdAndUpdate(cid, cart, { new: true });
    }

    static deleteCart = async (id) => {
        return cartModel.findByIdAndDelete(id);
    }

    static removeFromCart = async (cid, productId) => {
        const cart = await cartModel.findById(cid);
        const productIndex = cart.products.findIndex(product => product.productId.toString() === productId);
        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);

            await cart.save();

            console.log("Producto fue removido exitosamente");
        } else {
            console.log("Este producto no esta en el carrito");
        }
    }
}

export const cartsManager = new CartsManager();
