import { createHash, isValidPassword } from "../../../utils.js";
import { sendRestoreEmail } from "../../../utils/email.utils.js";
import { faker } from '@faker-js/faker/locale/es';
import userModel from "../models/user.model.js"

export class SessionsDAO {
	constructor() { }

	async getRestoreDao(req, res) {
		try {
			const { user } = req.session;
			const restoreEmail = user.email;
			if (!restoreEmail) {
			  return `Este email no existe`;
			}
			const restoreCookie = req.signedCookies.restoreCookie;
			if (!restoreCookie) {
			  return res.redirect('/home');
			}
		
			const cookieId = faker.database.mongodbObjectId();
			res.cookie('restoreCookie', cookieId, {
				signed: true,
				maxAge: 60 * 60 * 1000,
			});
			return await sendRestoreEmail(restoreEmail);
		} catch (err) {
			return res.status(500).json({ status: 'error', error: err.message });
		}
	}

	async getRestoreCallbackDao(req, res) {
		try {
			const { email, password } = req.body;
			const user = await userModel.findOne({ email });
			if (isValidPassword(user, password)) {
				return 'No puedes utilizar la misma contraseña';
			}
			const newPassword = createHash(password);
			await userModel.updateOne({ email }, { password: newPassword });
		} catch (err) {
			return res.status(500).json({ status: 'error', error: err.message });
		}
	}

	async getPremiumDao(req, res) {
		try {
			const { uid } = req.params;
			const user = userModel.findById(uid);
			if (!user) {
				return res.status(404).json({ status: 'error', message: 'El usuario no existe' });
			}
			return await userModel.updateOne({ _id: uid }, { role: 'premium' });
		} catch (err) {
			return res.status(500).json({ status: 'error', error: err.message });
		}
	}

};