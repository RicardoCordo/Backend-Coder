import CartDTO from "../DTOs/cart.dto.js";
import CartsDAO from "../dao/mongo/DAO/carts.dao.mongo.js";



class CartsRepository {
    constructor() {
        this.dao = new CartsDAO();
    }

    async getCarts() {
        try {
            console.log("desde el repository");
            return await this.dao.getCarts();
        } catch (error) {
            throw error;
        }
    }

    async getCart() {
        try {
            console.log("desde el repository");
            return await this.dao.getCart();
        } catch (error) {
            throw error;
        }
    }


    async createCart(cartInfo) {
        try {
            console.log("desde el repository");
            const newCartInfo = new CartDTO(cartInfo);

            return await this.dao.createCart(newCartInfo);
        } catch (error) {
            throw error;
        }
    }

    async addToCart() {
        try {
            console.log("desde el repository");
            return await this.dao.addToCart();
        } catch (error) {
            throw error;
        }
    }

    async updateCart() {
        try {
            console.log("desde el repository");
            return await this.dao.updateCart();
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

