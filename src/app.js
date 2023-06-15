import express from 'express';  
import products from '../routers/products.router.js'
import carts from '../routers/carts.router.js'
import views from '../routers/views.router.js';
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productos from "./data/products.json" assert { type: "json" };

const app = express();
const port = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use('/api/products', products);
app.use('/api/carts', carts);
app.use("/", views);



const httpServer = app.listen(port, () => {
  console.log('corriendo en el puerto', port)
});

const io = new Server(httpServer);
io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado");
	socket.emit("products", productos);
	socket.on("disconnect", () => {
		console.log("Cliente desconectado");
	});
});
