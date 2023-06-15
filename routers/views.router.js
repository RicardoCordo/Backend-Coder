import { Router } from "express";
const views = Router();

import products from "../src/data/products.json" assert { type: "json" };

views.get("/", (req, res) => {
	res.render("home", {
		style: "styles.css",
		documentTitle: "Productos",
		products
	});
});

views.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts", {
		style: "styles.css",
		documentTitle: "ProductosRealTime",
	});
});

export default views;