import CartDTO from "../DTOs/cart.dto.js";
import CartsDAO from "../dao/mongo/DAO/carts.dao.mongo.js";
import logger from "../utils/logger.utils.js";



class CartsRepository {
    constructor() {
        this.dao = new CartsDAO();
    }

    async getCarts() {
        try {
            logger.info("desde el repository");
            const carts = await this.dao.getCarts();
            return carts.map(cart => new CartDTO(cart.products));
        } catch (error) {
            logger.error(error);
        }
    }

    async getCart(cid) {
        try {
            logger.info("desde el repository");
            const cart = await this.dao.getCart(cid);
            
            return new CartDTO(cart.products);
        } catch (error) {
            logger.error(error);
        }
    }


    async createCart() {
        try {
            logger.info("desde el repository");
            const newCart = await this.dao.createCart();
            return newCart._id;
        } catch (error) {
            logger.error(error);
        }
    }


    async addToCart(cid, productId, quantity) {
        try {
            logger.info("desde el repository");
            return await this.dao.addToCart(cid, productId, quantity);
        } catch (error) {
            logger.error(error);
        }
    }

    async updateCart(cartId, cart) {
        try {
            logger.info("desde el repository");
            return await this.dao.updateCart(cartId, cart);
        } catch (error) {
            logger.error(error);
        }
    }
    async deleteCart() {
        try {
            logger.info("desde el repository");
            return await this.dao.deleteCart();
        } catch (error) {
            logger.error(error);
        }
    }


    async removeFromCart() {
        try {
            logger.info("desde el repository");
            return await this.dao.removeFromCart();
        } catch (error) {
            logger.error(error);
        }
    }
}



export default CartsRepository;

