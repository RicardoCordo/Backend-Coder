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
		pass: email_password,
	},
});

export const sendTicketEmail = async (ticketEmail, ticket) => {
	try {
		const emailContent = {
			from: email,
			to: `${ticketEmail}`,
			subject: 'Recibo de compra',
			html: `
			<div>
			<p>Aquí está tu ticket de compra:</p>
			<p>Código de Ticket: ${ticket.code}</p>
			<p>Fecha de Compra: ${ticket.purchase_datetime}</p>
			<p>Monto Total: ${ticket.amount}</p>
			<p>Comprador: ${ticket.purchaser}</p>
		  </div>
				`,
		};

		await transporter.sendMail(emailContent);
	} catch (error) {
		logger.error(error);
	}
};

export const sendInactiveUsersEmail = async (inactiveUserEmail) => {
	try {
		const emailContent = {
			from: email,
			to: `${inactiveUserEmail}`,
			subject: 'Usuarios inactivos eliminados',
			html: `
            <div>
                <p>Tu usuario ha sido eliminado por inactivo.</p>
            </div>
            `,
		};

		await transporter.sendMail(emailContent);
	} catch (error) {
		logger.error(error);
	}
};

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
}

export const sendProductDeletedEmail = async (deleteProductEmail, product) => {
	try {
		const emailContent = {
			from: email,
			to: `${deleteProductEmail}`,
			subject: 'Producto eliminado',
			html: `
				<div>
					<p>El producto "${product}" ha sido eliminado de tu cuenta premium.</p>
				</div>
				`,
		};

		await transporter.sendMail(emailContent);
	} catch (error) {
		logger.error(error);
	}


};



