import cartModel from "../models/cart.js";

export default class CartsManager {
    getCarts = () => {
        return cartModel.find().populate('products.productId').lean();
    };

    getCart = (cid) => {
        return cartModel.findById(cid).populate('products.productId')
    };

    createCart = (cart) => {
        return cartModel.create(cart)

    };

    addToCart = async (cid, productId) => {

        const cart = await cartModel.findById(cid);
        const existingProduct = cart.products.find(products => products.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ productId, quantity: 1 });
        }

      
        await cart.save();
    }

    updateCart = async (cid, cart) => {
        return await cartModel.findByIdAndUpdate(cid, cart, { new: true });
    }

    deleteCart = async (id) => {
        return cartModel.findByIdAndDelete(id);
    }

    removeFromCart = async (cid, productId) => {
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


