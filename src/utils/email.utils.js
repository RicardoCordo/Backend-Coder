import { createTransport } from "nodemailer";
import config from "../config/config.js";
import logger from "./logger.utils.js";

const email = config.email;
const email_password = config.email_password;
const port = config.port

const transporter = createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: email,
		pass: email_password ,
	},
});

export const sendRestoreEmail = async (restoreEmail) => {
	try {
		const emailContent = {
			from: email,
			to: `${restoreEmail}`,
			subject: 'Crear nueva contraseña',
			html: `
			<div>
				<p>Para crear una nueva contraseña visite el siguiente link:</p>
				<a href="http://localhost:${port}/restore">Crear nueva contraseña</a>
				<p>El link espira en 1 hora</p>
			</div>
			`,
		};

		await transporter.sendMail(emailContent);
		return;
	} catch (error) {
		logger.error(error);
	}
};
