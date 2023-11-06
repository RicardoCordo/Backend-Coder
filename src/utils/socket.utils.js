import { messageModel } from "../dao/mongo/models/messages.model.js";
import { Server } from "socket.io";
import logger from "./logger.utils.js";
import getProductsController from "../controllers/products.controller.js"

async function socketSetup(httpServer) {
  const io = new Server(httpServer);
  const messages = [];

  io.on("connection", async (socket) => {
    logger.info("Nuevo cliente conectado");

	try {
		const products = await getProductsController();
		socket.emit("products", products);
	  } catch (error) {
		logger.error("Error al obtener productos:", error);
	  }

    io.emit("messageLogs", messages);

    socket.on("user", (data) => {
      messages.push(data);
      io.emit("messagesLogs", messages);
    });

    socket.on("message", (data) => {
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

export default socketSetup;
