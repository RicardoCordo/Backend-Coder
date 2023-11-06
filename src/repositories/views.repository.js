import { ViewsDAO } from "../dao/mongo/DAO/views.dao.mongo.js";




class ViewsRepository {
	constructor() {
		this.dao = new ViewsDAO();
	}

	async getLogin(req, res) {
		try {
			return await this.dao.getLoginDao(req, res);
		} catch (error) {
			return res.status(500).json({ error: err.message });
		}
	}

	async getRegister(req, res) {
		try {
			return await this.dao.getRegisterDao(req, res);
		} catch (error) {
			return res.status(500).json({ error: err.message });
		}
	}


	async getCart(req, res) {
		try {
			return await this.dao.getCartDao(req, res);
		} catch (error) {
			return res.status(500).json({ error: err.message });
		}
	}



	async getRestore(req, res) {
		try {
			return await this.dao.getRestoreDao(req, res);
		} catch (error) {
			return res.status(500).json({ error: err.message });
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