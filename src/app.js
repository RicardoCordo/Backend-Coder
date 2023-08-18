import express from 'express';
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import passport from 'passport';
import inizializePassport from './config/passport.config.js';

import __dirname from "./utils.js";

//import carts from './routes/filesystem/carts.router.js'
//import views from './routes/filesystem/views.router.js';
import { messageModel } from "./dao/mongo/models/messages.model.js"
import viewsRouter from './routes/mongo/views.router.js';
import views from './routes/chat/views.router.js';
import cookiesRouter from "./routes/mongo/cookies.router.js";
import { Server } from "socket.io";
import products from "./data/products.json" assert { type: "json" };
import MongoStore from 'connect-mongo';
import session from 'express-session';
import config from './config/config.js';
import router from './routes/mongo/index.js'

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
const connection = await mongoose.connect(config.mongoUrl)
const port = config.port
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: config.mongoUrl,
			ttl: 1000000000,
		}),
		secret: config.secretCode,
		resave: false,
		saveUninitialized: true,
	})
);

inizializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use("/", viewsRouter);
app.use("/cookies", cookiesRouter);
app.use("/chat", views);
app.use("/api", router );



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
