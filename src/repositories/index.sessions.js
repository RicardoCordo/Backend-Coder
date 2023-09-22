import { SessionsDAO } from "../dao/mongo/DAO/sessions.dao.mongo.js"
import sessionsRepository from "./sessions.repository.js"


const sessionsService = new sessionsRepository(SessionsDAO)

export default sessionsService
