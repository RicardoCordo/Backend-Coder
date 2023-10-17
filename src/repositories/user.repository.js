import UsersDAO from "../dao/mongo/DAO/user.dao.mongo.js";


class usersRepository {
	constructor() {
		this.dao = new UsersDAO();
	}
	async getUserById(req, res) {
		try {
			return await this.dao.getUserById(req, res);
		} catch (err) {
			return res.status(500).json({ status: 'error', error: err.message });
		}
	}

	async getPremium(req, res) {
		try {
			return await this.dao.getPremiumDao(req, res);
		} catch (err) {
			return res.status(500).json({ status: 'error', error: err.message });
		}
	}
	async UploadDocument(uid, userDocuments, documentType) {
		try {
			return await this.dao.updateUser(uid, userDocuments, documentType);
		} catch (err) {
			return res.status(500).json({ status: 'error', error: err.message });
		}
	}
}




export default usersRepository;

