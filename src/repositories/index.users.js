import UsersDAO from "../dao/mongo/DAO/user.dao.mongo.js"
import usersRepository from "./user.repository.js"

const usersService = new usersRepository(UsersDAO)
export default usersService
