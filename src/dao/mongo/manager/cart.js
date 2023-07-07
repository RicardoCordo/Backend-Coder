import cartModel from "../models/cart.js";

export default class CartsManager {
    getCarts = () => {
        return cartModel.find().lean();
    };

    getCart = (id) => {
        return cartModel.findById(id)
    };

    createCart = (cart) => {
        return cartModel.create(cart)

    };

  


}
