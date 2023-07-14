import express from 'express';
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import __dirname from "./utils.js";

//import carts from './routes/filesystem/carts.router.js'
//import views from './routes/filesystem/views.router.js';
import { messageModel } from "./dao/mongo/models/messages.js"
import productsRouter from './routes/mongo/products.router.js'
import viewsRouter from './routes/mongo/views.router.js';
import views from './routes/chat/views.router.js';
import cartsRouter from './routes/mongo/cart.router.js'
import { Server } from "socket.io";
import products from "./data/products.json" assert { type: "json" };


const app = express();
const connection = await mongoose.connect("mongodb+srv://ricardocordo93:ricardoCoder@cluster0.h0zve9o.mongodb.net/?retryWrites=true&w=majority")
const port = 8080;
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/chat", views);
app.use("/api/carts", cartsRouter);



const httpServer = app.listen(port, () => {
	console.log('corriendo en el puerto', port)
});

const io = new Server(httpServer);
const messages = [];
io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado");
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
		console.log("Cliente desconectado");
	});

});

