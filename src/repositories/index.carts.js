
import CartsRepository from "./carts.repository.js";
import CartsDAO from "../dao/mongo/DAO/carts.dao.mongo.js";


const cartsService= new CartsRepository(CartsDAO)
export default  cartsService
