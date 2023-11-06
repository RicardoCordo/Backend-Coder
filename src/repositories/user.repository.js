import UsersDAO from "../dao/mongo/DAO/user.dao.mongo.js";


class usersRepository {
	constructor() {
		this.dao = new UsersDAO();
	}

	async getAllUsers(req, res) {
		try {
			return await this.dao.getAllUsers(req, res);
		} catch (err) {
			return res.status(500).json({ status: 'error', error: err.message });
		}
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

	async deleteUser(uid) {
		try {
			return await this.dao.deleteUser(uid);
		} catch (error) {
			return { status: 'error', error: error.message };
		}
	}

	async deleteInactiveUsers(twoDaysAgo) {
		try {
			return await this.dao.deleteInactiveUsers(twoDaysAgo);
		} catch (error) {
			return { status: 'error', error: error.message };
		}
	}

	async updateUserRole(uid, newRole) {
		try {
			const result = await this.dao.updateUserRole(uid, newRole);
			return { status: 'success', result };
		} catch (error) {
			return { status: 'error', error: error.message };
		}
	};


};


export default usersRepository;

