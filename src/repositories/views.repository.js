import { ViewsDAO } from "../dao/mongo/DAO/views.dao.mongo.js";
import logger from "../utils/logger.utils.js";



class ViewsRepository {
    constructor() {
      this.dao = new ViewsDAO();
    }
  
    async getRestore(req, res) {
		try {
			return await this.dao.getRestoreDao(req, res);
		} catch (error) {
            logger.info("error repository");
		}
	}

	async getRestoreCallback(req, res) {
		try {
			return await this.dao.getRestoreCallbackDao(req, res);
		} catch (error) {
            return res.status(500).json({ error: err.message });
		}
	}

  }
  
  
  
  
  export default ViewsRepository;