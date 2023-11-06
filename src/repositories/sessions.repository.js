import { SessionsDAO } from "../dao/mongo/DAO/sessions.dao.mongo.js";


class sessionsRepository {
	constructor() {
		this.dao = new SessionsDAO();
	}

	async getRestore(req, res) {
		try {
			return await this.dao.getRestoreDao(req, res);
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	}

	async getRestoreCallback(req, res) {
		try {
			return await this.dao.getRestoreCallbackDao(req, res);
		} catch (err) {
			return res.status(500).json({ status: 'error', error: err.message });
		}
	}

}

export default sessionsRepository;