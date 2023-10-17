import usersService from "../repositories/index.users.js";


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

export default {
	premiumUser,
	UploadDocument
};