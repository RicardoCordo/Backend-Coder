import { Router } from "express";
import ProductsManager from "../../dao/mongo/manager/products.js";

const router = Router();
const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
  const products = await productsManager.getProducts();
  res.render("products", { products });
});

export default router;