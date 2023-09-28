import express from 'express';
import handlebars from "express-handlebars";
import passport from 'passport';
import inizializePassport from './config/passport.config.js';
import cors from 'cors'

import __dirname from "./utils.js";

import MongoStore from 'connect-mongo';
import session from 'express-session';
import config from './config/config.js';
import router from './routes/mongo/index.js'
import connectDB from '../db/index.js';
import errorHanler from "./errors/index.js"
import morgan from 'morgan';
import logger from './utils/logger.utils.js';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import socketSetup from './utils/socket.utils.js';


const port = config.port
const secretCode = config.secretCode
const app = express();

const swaggerOptions = {
	definition:{
		openapi: '3.1.0',
		info:{
			title:'Curso Backend',
			description: 'Aprendiendo Backend en Coder House'
		},
	},
	apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerOptions);

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
	app.use(cookieParser(secretCode));
	inizializePassport();
	app.use(passport.initialize());
	app.use(passport.session());
	app.use ("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
	
	
	connectDB();
	router(app)
	app.use(errorHanler)
	
	
	
	const httpServer = app.listen(port, () => {
		logger.info(`Corriendo en el puerto ${port}`);
	});
	socketSetup(httpServer);
	