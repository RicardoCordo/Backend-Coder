import { Router } from "express";
import ProductsManager from "../../dao/mongo/manager/products.js";

const router = Router();
const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
  const products = await productsManager.getProducts();
  res.json({ status: "ok", data: products });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productsManager.getProduct(id);
  res.json({ status: "ok", data: product });
});

router.post("/", async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ status: "error", message: "No data sent!" });
  }
  const product = req.body;
  const createdProduct = await productsManager.createProduct(product);
  res.status(201).json({ status: "ok", data: createdProduct });
});

router.put("/:id", async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ status: "error", message: "No data sent!" });
  }
  const { id } = req.params;
  const newProduct = req.body;
  await productsManager.updateProduct(id, newProduct);
  res.json({ status: "ok", data: newProduct });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await productsManager.deleteProduct({ _id: id });
  res.sendStatus(204);
});

export default router;