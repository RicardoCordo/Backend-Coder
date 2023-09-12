import express from 'express';
import handlebars from "express-handlebars";
import passport from 'passport';
import inizializePassport from './config/passport.config.js';
import cors from 'cors'

import __dirname from "./utils.js";

//import carts from './routes/filesystem/carts.router.js'
//import views from './routes/filesystem/views.router.js';
import { messageModel } from "./dao/mongo/models/messages.model.js"
import { Server } from "socket.io";
import products from "./data/products.json" assert { type: "json" };
import MongoStore from 'connect-mongo';
import session from 'express-session';
import config from './config/config.js';
import router from './routes/mongo/index.js'
import connectDB from '../db/index.js';
import errorHanler from "./errors/index.js"
import morgan from 'morgan';
import logger from './utils/logger.js';


const port = config.port
const app = express();

//const connection = await mongoose.connect(config.mongoUrl)
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
	
	
	
	app.engine("handlebars", handlebars.engine());
	app.set("view engine", "handlebars");
	app.set("views", __dirname + "/views");
	app.use(express.json());
	app.use(express.static(__dirname + "/public"));
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan('dev'))
	app.use(cors());
	
	inizializePassport();
	app.use(passport.initialize());
	app.use(passport.session());
	
	
	
	connectDB();
	router(app)
	app.use(errorHanler)
	
	
	
	const httpServer = app.listen(port, () => {
		logger.info(`Corriendo en el puerto ${port}`);
	});
	
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
