import ProductsDAO from "../dao/mongo/DAO/products.dao.mongo.js";
import ProductsRepository from "./products.repository.js"
import CartsRepository from "./carts.repository.js";
import CartsDAO from "../dao/mongo/DAO/carts.dao.mongo.js";


const productsRepository = new ProductsRepository(ProductsDAO)
const cartsRepository = new CartsRepository(CartsDAO)
export default {
    productsRepository,
    cartsRepository
}