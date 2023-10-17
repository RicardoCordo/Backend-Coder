
import logger from "../../../utils/logger.utils.js";
import userModel from "../models/user.model.js";

export default class UsersDAO {
    constructor() { }

    getUsers = () => {
        try {
            return userModel.find().lean();
        } catch (error) {
            logger.error (error);
        }
    };

    getUserById = (uid) => {
        try {
            return userModel.findById(uid);
        } catch (error) {
            logger.error (error);
        }
    };

    createUser = (user) => {
        try {
            return userModel.create(user);
        } catch (error) {
            logger.error (error);
        }
    };

    updateUser = (uid, userDocuments, documentType) => {
        try {
            const update = {};
            update['documents'] = userDocuments;
            return userModel.findByIdAndUpdate(
                uid,
                { $push: update },
                { new: true }
            );
        } catch (error) {
            logger.error(error);
        }
    };

    deleteUser = (uid) => {
        try {
            return userModel.findByIdAndDelete(uid);
        } catch (error) {
            logger.error (error);
        }
    };
    async getPremiumDao(req, res) {
		try {
			const { uid } = req.params;
			const user = userModel.findById(uid);
			if (!user) {
				return res.status(404).json({ status: 'error', message: 'El usuario no existe' });
			}
			return await userModel.updateOne({ _id: uid }, { role: 'premium' })
		} catch (error) {
			logger.error (error);
		}
	}
}