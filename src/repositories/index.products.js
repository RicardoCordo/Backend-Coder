import ProductsDAO from "../dao/mongo/DAO/products.dao.mongo.js";
import ProductsRepository from "./products.repository.js"

const productsService = new ProductsRepository(ProductsDAO)
export default productsService
