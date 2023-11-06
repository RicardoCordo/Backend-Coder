import { ViewsDAO } from "../dao/mongo/DAO/views.dao.mongo.js"
import ViewsRepository from "./views.repository.js"

const viewsService = new ViewsRepository(ViewsDAO)
export default viewsService
