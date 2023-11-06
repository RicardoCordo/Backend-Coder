import usersService from "../repositories/index.users.js";
import { sendInactiveUsersEmail } from "../utils/email.utils.js";

const getAllUsers = async (req, res) => {
	try {

		const users = await usersService.getAllUsers();

		const usersData = users.map((user) => ({
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			role: user.role
		}));

		return res.status(200).json({ status: 'success', payload: usersData });
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener los usuarios' });
	}
};

const premiumUser = async (req, res) => {
	try {
		const { uid } = req.params;

		const user = await usersService.getUserById(uid);

		if (!user) {
			return res.status(404).json({ status: 'error', message: 'El usuario no existe' });
		}
		const requiredDocuments = ['identificacion', 'comprobante de domicilio', 'comprobante de estado de cuenta'];

		if (requiredDocuments.every(doc => user.documents.includes(doc))) {

			await usersService.getPremium(uid);
			return res.redirect('/home');
		} else {
			return res.status(400).json({ status: 'error', message: `El usuario no ha completado la carga de todos los documentos requeridos` });
		}
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

const UploadDocument = async (req, res) => {
	try {
		const { uid } = req.params;

		const documents = req.files;

		if (!Array.isArray(documents) || documents.length === 0) {
			return res.status(400).json({ status: 'error', error: 'No se encontraron documentos en la solicitud' });
		}

		const user = await usersService.getUserById(uid);

		if (!user) {
			return res.status(404).json({ status: 'error', message: 'El usuario no existe' });
		}

		await usersService.UploadDocument(uid, documents);

		res.status(200).json({ status: 'success', message: 'Documentos subidos con éxito' });
	} catch (err) {
		res.status(500).json({ status: 'error', error: err.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { uid } = req.params;
		const user = await usersService.getUserById(uid);

		if (!user) {
			return res.status(200).json({ status: 'success', message: 'El usuario no existe' });
		}

		const result = await usersService.deleteUser(uid);

		res.status(200).json({ status: 'success', message: 'Usuario eliminado con éxito', result });

	} catch (err) {
		res.status(500).json({ status: 'error', error: err.message });
	}
};

const deleteInactiveUsers = async (req, res) => {
	try {
		const { user } = req.session;
		const inactiveUserEmail = user.email
		const twoDaysAgo = new Date();
		twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

		const deletedUsers = await usersService.deleteInactiveUsers(twoDaysAgo);


		deletedUsers.forEach(async (user) => {
			if (user.email) {
				await sendInactiveUsersEmail(inactiveUserEmail);
			}
		});

		res.status(200).json({
			status: 'success',
			message: 'Usuarios inactivos eliminados con éxito',
			deletedUsers,
		});
	} catch (error) {
		res.status(500).json({ status: 'error', error: 'Error al limpiar usuarios inactivos' });
	}
};

const roleChange = async (req, res) => {
	try {
		const { uid } = req.params;
		const { newRole } = req.body;
		console.log(uid);

		const user = await usersService.getUserById(uid);
		if (!user) {
			return res.status(404).json({ status: 'error', message: 'El usuario no existe' });
		}

		if (newRole !== 'user' && newRole !== 'premium') {
			return res.status(400).json({ status: 'error', message: 'El nuevo rol no es válido' });
		}

		await usersService.updateUserRole(uid, newRole);

		res.status(200).json({ status: 'success', message: 'Rol de usuario actualizado con éxito' });
	} catch (err) {
		res.status(500).json({ status: 'error', error: err.message });
	}
};

export default {
	getAllUsers,
	premiumUser,
	UploadDocument,
	deleteUser,
	deleteInactiveUsers,
	roleChange
};