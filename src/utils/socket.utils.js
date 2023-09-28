import { messageModel } from "../dao/mongo/models/messages.model.js"
import { Server } from "socket.io";
import products from "../data/products.json" assert { type: "json" };
import logger from "./logger.utils.js";

function socketSetup (httpServer){
const io = new Server(httpServer);
	const messages = [];
	io.on("connection", (socket) => {
		logger.info("Nuevo cliente conectado");
		socket.emit("products", products);
		io.emit("messageLogs", messages);
		socket.on("user", data => {
			messages.push(data);
			io.emit("messagesLogs", messages);
		});
	socket.on("message", data => {
		messages.push(data);
		io.emit("messagesLogs", messages);
		messageModel.create({
			user: data.user,
			message: data.message,
		});
	});


	socket.on("disconnect", () => {
		logger.info("Cliente desconectado");
	});

});
}

export default socketSetup
