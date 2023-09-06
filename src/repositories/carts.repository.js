import CartDTO from "../DTOs/cart.dto.js";
import CartsDAO from "../dao/mongo/DAO/carts.dao.mongo.js";



class CartsRepository {
    constructor() {
        this.dao = new CartsDAO();
    }

    async getCarts() {
        try {
            console.log("desde el repository");
            const carts = await this.dao.getCarts();
            return carts.map(cart => new CartDTO(cart.products));
        } catch (error) {
            throw error;
        }
    }

    async getCart(cid) {
        try {
            console.log("desde el repository");
            const cart = await this.dao.getCart(cid);
            return new CartDTO(cart.products);
        } catch (error) {
            throw error;
        }
    }


    async createCart() {
        try {
            console.log("desde el repository");
            const newCart = await this.dao.createCart();
            return newCart._id;
        } catch (error) {
            throw error;
        }
    }


    async addToCart(cid, productId, quantity) {
        try {
            console.log("desde el repository");
            return await this.dao.addToCart(cid, productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }

    async updateCart(cartId, cart) {
        try {
            console.log("desde el repository");
            return await this.dao.updateCart(cartId, cart);
        } catch (error) {
            throw error;
        }
    }
    async deleteCart() {
        try {
            console.log("desde el repository");
            return await this.dao.deleteCart();
        } catch (error) {
            throw error;
        }
    }


    async removeFromCart() {
        try {
            console.log("desde el repository");
            return await this.dao.removeFromCart();
        } catch (error) {
            throw error;
        }
    }
}



export default CartsRepository;

